/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/#!/home');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up'
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    console.log('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
      res.redirect('/#!/home'); //angular route
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var message = null;

    db.User.find({where : { email: req.body.email }, include: [{model: db.userProfile, as: 'Profile'}]}).then(function(user){
        if (!user) {
            // User doesn't already exist, we can create them.
            var user = db.User.build(req.body);

            if ((user.email.length < 3) || (user.password < 3)) {
                res.render('users/signup', {
                    message: "Invalid Email or Password",
                    user: user
                });
                return false;
            }
            user.provider = 'local';
            user.salt = user.makeSalt();
            user.hashedPassword = user.encryptPassword(req.body.password, user.salt);
            console.log('New User (local) : { id: ' + user.id + ' username: ' + user.email + ' }');

            user.save().then(function (newUser) {
                db.userProfile.create({UserId: newUser.id}).then(function (newProfile) {
                    console.log(newProfile.id);
                });
                req.login(user, function (err) {
                    if (err) res.redirect('/');
                    res.redirect('/#!/profile');
                });
            }).catch(function (err) {
                res.render('users/signup', {
                    message: message,
                    user: user
                });
            });
        }else{
            res.render('users/signup', {
                message: "This User Already Exists, login to continue.",
                user: user
            });
        }
    }).catch(function(err){
        // Error State
        res.jsonp(err);
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    db.User.find({where : { id: req.user.id }, include: [{model: db.userProfile, as: 'Profile', include: [db.state, db.pod]}]}).then(function(user){
        if (!user) return next(new Error('Failed to load User ' + id));
        res.jsonp(user);
    }).catch(function(err){
        // Error State
        res.jsonp(err);
    });
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    db.User.find({where : { id: id }, include: [{model: db.userProfile, as: 'Profile'}]}).then(function(user){
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    }).catch(function(err){
      next(err);
    });
};

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.profile.id != req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
