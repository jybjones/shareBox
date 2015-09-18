/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * List of Items
 */
exports.showPublic = function(req, res) {
    return res.jsonp(req.profile);
};

exports.show = function(req, res){
    db.userProfile.find({ where: {userId: req.user.id}, include: [db.User]}).then(function(profile){
        res.jsonp(req.profile);
    });
};

exports.update = function(req, res){
    // create a new variable to hold the article that was placed on the req object.
    var profile = req.profile;
console.log(req);
    profile.updateAttributes({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.profile = function(req, res, next, id) {
    console.log('id => ' + id);
    db.userProfile.find({ where: {id: id}}).then(function(profile){
        if(!profile) {
            return next(new Error('Failed to load profile ' + id));
        } else {
            req.profile = profile;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.loadUserProfile = function(req, res, next) {
    db.userProfile.find({ where: {userId: req.user.id}, include: [db.User]}).then(function(profile){
        if(!profile){
            return next(new Error('Failed to load profile for logged in user.'));
        }else{
            req.profile = profile;
            return next();
        }
    });
};
