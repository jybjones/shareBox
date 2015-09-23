/**
 * Module dependencies.
 */
var cloudinary = require('../../config/cloudinary');
var db = require('../../config/sequelize');
var fs = require('fs');

/**
 * Get Item
 */
exports.item = function(req, res, next, id){
    console.log('id => ' + id);
    db.item.find({ where: {id: id}, include: [db.userProfile, db.image]}).then(function(item){
        if(!item) {
            return next(new Error('Failed to load item ' + id));
        } else {
            req.item = item;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.image = function(req, res, next, id){
    console.log('id => ' + id);
    db.image.find({ where: {id: id}, include: [{ model: db.item, include: [db.userProfile]}]}).then(function(image){
        if(!image) {
            return next(new Error('Failed to load item ' + id));
        } else {
            req.image = image;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.show = function(req, res){
    res.jsonp(req.item)
};
/**
 * List of Items
 */
exports.all = function(req, res) {
    db.item.findAll({include: [db.userProfile, db.image]}).then(function(items){
        return res.jsonp(items);
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.allMine = function(req, res) {
    db.userProfile.find({ where: {userId: req.user.id}}).then(function(profile){
      db.item.findAll({where: {userProfileId: profile.id}, include: [db.userProfile, db.image]}).then(function(items){
          console.log(items);
          return res.jsonp(items);
      }).catch(function(err){
          return res.render('500', {
              error: err,
              status: 500
          });
      });
    });
};


/**
 * Create a item
 */
exports.create = function(req, res) {
    console.log(req.body);
    // augment the item by adding the userProfileId
    req.body.userProfileId = req.user.id;
    var images = [];
    // save and return and instance of article on the res object.
    db.item.create(req.body).then(function(item){
        if(!item){
            // Handle No Item being created.
        } else {
            db.Sequelize.Promise.reduce(req.body.images, function(images, image){
                image.itemId = item.id;
                db.image.create(image).then(function(newImage){
                    return newImage;
                });
            }, []).then(function(){
                return res.jsonp(item);
            });
        }
    }).catch(function(err){
        // Handle Error on Create
    });
};

/**
 * Update Item
 */
exports.update = function(req, res){
    // create a new variable to hold the item that was placed on the req object.
    var item = req.item;

    var images = [];
    item.updateAttributes({
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        conditionId: req.body.conditionId
    }).then(function(item){
        db.Sequelize.Promise.reduce(req.body.images, function(images, image){
            image.itemId = item.id;
            db.image.create(image).then(function(newImage){
                return newImage;
            });
        }, []).then(function(){
            return res.jsonp(item);
        });
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.uploadPhoto = function(req, res){
    console.log(req.files);
    cloudinary.uploader.upload(req.files.file.path, function(result){
        console.log(result);
        url = cloudinary.url(result.public_id, {secure: true});
        console.log(url);
        return res.jsonp({public_id: result.public_id, version: result.version, url: url});
    }, {width: 300, height: 300, crop: 'pad', format: 'png', return_delete_token: true});
};

exports.deletePhoto = function(req, res){
    var image = req.image;

    image.destroy().then(function(image){
        return res.jsonp(image);
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });

};

exports.destroy = function(req, res){
    // create a new variable to hold the item that was placed on the req object.
    var item = req.item;

    item.destroy().then(function(item){
        db.image.destroy({ where: {itemId: null}}).then(function(images){
            console.log(images);
            return res.jsonp(item);
        }).catch(function(err){
            return res.render('500', {
                error: err,
                status: 500
            });
        });
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.hasImageAuthorization = function(req, res, next){
    if(req.image.item.userProfile.UserId != req.user.id){
        return res.send(401, 'User is not authorized');
    }
    next();
};

exports.hasAuthorization = function(req, res, next){
    if (req.item.userProfile.UserId != req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};
