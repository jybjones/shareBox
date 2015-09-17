/**
 * Module dependencies.
 */
var _ = require('lodash');


exports.render = function(req, res) {
    // The Index is the Jade index
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};
