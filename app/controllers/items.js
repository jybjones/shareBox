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
    db.item.find({ where: {id: id}, include: [db.userProfile, db.image, { model: db.request, include: [db.message] }]}).then(function(item){
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

exports.request = function(req, res, next, id){
    console.log('id => ' + id);
    db.request.find({ where: {id: id}, include: [{ model: db.item, include: [db.userProfile]}, { model: db.userProfile, as: "RequesterProfile"}, { model: db.message, include: [{ model: db.userProfile, as: "From"}]}]}).then(function(request){
        if(!request) {
            return next(new Error('Failed to load item ' + id));
        } else {
            req.request = request;
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
    db.item.findAll({include: [db.userProfile, db.image], order: [['updatedAt', 'DESC']]}).then(function(items){
        return res.jsonp(items);
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.allMine = function(req, res) {
    db.userProfile.find({ where: {userId: req.user.id}, order: [['updatedAt', 'DESC']]}).then(function(profile){
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

exports.requestItem = function(req, res){
    console.log(req.body);
    req.body.RequesterProfileId = req.user.id;
    req.body.approved = false;

    // save and return and instance of article on the res object.
    db.request.create(req.body).then(function(request){
        if(!request){
            // Handle No Item being created.
        } else {
            db.item.find({ where: {id: req.body.itemId}, include: [db.userProfile, db.image, { model: db.request, include: [db.message] }]}).then(function(item){
                if(!item) {
                    // Handle Error.
                } else {
                    db.message.create({message: req.body.message, FromId: req.user.id, ToId: item.userProfile.UserId, requestId: request.id}).then(function(newMessage){
                        return res.jsonp(item);
                    });
                }
            }).catch(function(err){
                // Handle Error
            });

        }
    }).catch(function(err){
        // Handle Error on Create
    });

};

exports.approveRequest = function(req, res){
    var request = req.request;
    request.updateAttributes({ approved: true }).then(function(request){
        return res.jsonp(request);
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.loadRequest = function(req, res){
    res.jsonp(req.request)
};

exports.postMessage = function(req, res){
    db.message.create(req.body).then(function(message){
        if(!message){
            // Handle No Entry being created.
        }else{
            db.request.find({ where: {id: message.requestId}, include: [{ model: db.item, include: [db.userProfile]}, { model: db.userProfile, as: "RequesterProfile"}, { model: db.message, include: [{ model: db.userProfile, as: "From"}]}]}).then(function(request){
                if(!request) {
                    // Handle Error.
                } else {
                    return res.jsonp(request)
                }
            }).catch(function(err){
                // Handle Error.
            });
        }
    }).catch(function(err){
        // Handle Error
    });
};

exports.listRequests = function(req, res){
    var returnList = {
        requestsReceived: [],
        requestsMade: []
    };
    db.request.findAll({ where: { RequesterProfileId: req.user.id }, include: [{ model: db.item, include: [db.userProfile]}, { model: db.userProfile, as: "RequesterProfile"}, { model: db.message, include: [{ model: db.userProfile, as: "From"}]}], order: [['updatedAt', 'DESC']]}).then(function(requestsMade){
        if(!requestsMade) {
            // Handle Error.
        } else {
            returnList.requestsMade = requestsMade;
            db.request.findAll({ where: { LenderProfileId: req.user.id }, include: [{ model: db.item, include: [db.userProfile]}, { model: db.userProfile, as: "RequesterProfile"}, { model: db.message, include: [{ model: db.userProfile, as: "From"}]}], order: [['updatedAt', 'DESC']]}).then(function(requestsReceived){
                if(!requestsMade) {
                    // Handle Error.
                } else {
                    returnList.requestsReceived = requestsReceived;
                    return res.jsonp(returnList);
                }
            }).catch(function(err){
                // Handle Error.
            });
        }
    }).catch(function(err){
        // Handle Error.
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
