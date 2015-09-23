/**
 * Module dependencies.
 */
var _ = require('lodash');
var cloudinary = require('../../config/cloudinary');
var db = require('../../config/sequelize');


exports.render = function(req, res) {
    //var image = cloudinary.url("sample.jpg", { width: 100, height: 150, crop: "fill" });
    if(req.user) {
        db.User.find({where: {id: req.user.id}, include: [{model: db.userProfile, as: 'Profile'}]}).then(function (user) {
            if (!user) {
                return next(new Error('Failed to load profile for logged in user.'));
            } else {
                res.render('index', {
                    user: JSON.stringify(user)
                });
            }
        });
    }else{
        res.render('index', {
            user: "null"
        });
    }
};
