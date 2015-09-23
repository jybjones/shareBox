var _         = require('lodash');
var config    = require('./config');
var cloudinary = require('cloudinary');
var winston   = require('./winston');


winston.info('Initializing Cloudinary...');

// create your instance of Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloud,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
    cdn_subdomain: true,
    secure: true
});

// assign the cloudinary variables to the db object and returning the db.
module.exports = cloudinary;