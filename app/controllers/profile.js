/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');
var geocoder = require('geocoder');
var haversine = require('haversine');

/**
 * List of Items
 */
exports.showPublic = function(req, res) {
    var cleanProfile = {
        firstName: req.profile.firstName,
        lastName: req.profile.lastName,
        city: req.profile.city,
        state: req.profile.stateId,
        postalCode: req.profile.postalCode
    };
    return res.jsonp(cleanProfile);
};

exports.show = function(req, res){
    db.userProfile.find({ where: {userId: req.user.id}, include: [db.User, db.state]}).then(function(profile){
        //// Get Lat/Lng
        //console.log(profile);
        //console.log(profile.address1+" "+profile.address2+" "+profile.city+", "+profile.state.state+" "+profile.postalCode);
        //geocoder.geocode(profile.address1+" "+profile.address2+" "+profile.city+", "+profile.state.state+" "+profile.postalCode, function(err, data) {
        //    console.log(data);
        //    console.log(data.results[0].geometry.location);
            res.jsonp(req.profile);
        //});
    });
};

exports.update = function(req, res){
    // create a new variable to hold the article that was placed on the req object.
    var profile = req.profile;

    profile.updateAttributes({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        stateId: req.body.stateId,
        postalCode: req.body.postalCode
    }).then(function(p){
        db.userProfile.find({ where: {userId: req.user.id}, include: [db.User, db.state]}).then(function(updatedProfile) {
            // Get Lat/Lng
            geocoder.geocode(updatedProfile.address1 + " " + updatedProfile.address2 + " " + updatedProfile.city + ", " + updatedProfile.state.state + " " + updatedProfile.postalCode, function (err, data) {

                // Did we get a valid lat/lng?
                if(err == null) {
                    // Fetch all Pods from DB, and Haversine to get distance!
                    var finalPod = {
                        distance:   100000,
                        podId:      null
                    };
                    db.pod.findAll().then(function(pods){
                        // Find Nearest Pod
                        pods.forEach(function(pod){
                            // Calculate Distance
                            var userLocation = {
                                latitude: data.results[0].geometry.location.lat,
                                longitude: data.results[0].geometry.location.lng
                            };
                            var podLocation = {
                                latitude: pod.lat,
                                longitude: pod.lng
                            };
                            var podDistance = haversine(userLocation, podLocation);
                            if(podDistance < finalPod.distance){
                                finalPod.distance = podDistance;
                                finalPod.podId = pod.id;
                            }
                        });
                        // Write Closest Pod to DB!
                        if(finalPod.podId != null) {
                            updatedProfile.updateAttributes({ podId: finalPod.podId }).then(function(p){
                                db.userProfile.find({ where: {userId: req.user.id}, include: [db.User, db.state]}).then(function(lastProfile) {
                                    return res.jsonp(lastProfile);
                                });
                            }).catch(function(err){
                                console.log(err);
                                return res.render('500', {
                                    error: err,
                                    status: 500
                                });
                            });
                        }else{
                            return res.jsonp(updatedProfile);
                        }
                    }).catch(function(err){
                        return res.render('500', {
                            error: err,
                            status: 500
                        });
                    });
                }else{
                    return res.jsonp(updatedProfile);
                }
            });
        });
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.profile = function(req, res, next, id) {
    console.log('id => ' + id);
    db.userProfile.find({ where: {id: id}, include: [db.state]}).then(function(profile){
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
          db.userProfile.create({UserId: req.user.id}).then(function(newProfile){req.profile = newProfile;});
            // return next(new Error('Failed to load profile for logged in user.'));
        }else{
            req.profile = profile;
            return next();
        }
    });
};
