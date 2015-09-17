/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

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


/**
 * Create a item
 */
exports.create = function(req, res) {
    // augment the item by adding the userProfileId
    req.body.userProfileId = req.user.id;
    // save and return and instance of article on the res object.
    db.Article.create(req.body).then(function(article){
        if(!article){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(article);
        }
    }).catch(function(err){
        return res.send('users/signup', {
            errors: err,
            status: 500
        });
    });
};
