/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Get Item
 */
exports.item = function(req, res, next, id){
    console.log('id => ' + id);
    db.item.find({ where: {id: id}, include: [db.userProfile]}).then(function(item){
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

/**
 * List of Items
 */
exports.all = function(req, res) {
    db.item.findAll({include: [db.userProfile]}).then(function(items){
        return res.jsonp(items);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.allMine = function(req, res) {
    console.log(req.user);
    db.item.findAll({where: {userProfileId: 1}, include: [db.userProfile]}).then(function(items){
        return res.jsonp(items);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};


/**
 * Create a item
 */
exports.create = function(req, res) {
    // augment the item by adding the userProfileId
    req.body.userProfileId = req.user.id;
    // save and return and instance of article on the res object.
    db.item.create(req.body).then(function(item){
        if(!item){
            // Handle No Item being created.
        } else {
            return res.jsonp(item);
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

    item.updateAttributes({
        name: req.body.name,
        description: req.body.description
    }).then(function(i){
        return res.jsonp(i);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.destroy = function(req, res){
    // create a new variable to hold the item that was placed on the req object.
    var item = req.item;

    item.destroy().then(function(item){
        return res.jsonp(item);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.hasAuthorization = function(req, res, next){
    if (req.item.userProfile.UserId != req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};