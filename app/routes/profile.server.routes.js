
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
profile = require('../../app/controllers/profile');

module.exports = function(app, express) {

app.route('/api/profile')
    .get(users.requiresLogin, profile.loadUserProfile, profile.show)
    .put(users.requiresLogin, profile.loadUserProfile, profile.update);
app.route('/api/profile/:profileId')
    .get(profile.showPublic);
   // .put(users.requiresLogin, items.hasAuthorization, items.update)
   // .delete(users.requiresLogin, items.hasAuthorization, items.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('profileId', profile.profile);
};

