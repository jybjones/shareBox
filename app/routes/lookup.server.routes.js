
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
lookup = require('../../app/controllers/lookup');

module.exports = function(app) {
// Article Routes
app.route('/api/lookup/states')
    .get(lookup.allStates);
app.route('/api/lookup/categories')
    .get(lookup.allCategories);
//app.route('/api/lookup/conditions')
//    .get(lookup.allConditions);

};