
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
    items = require('../../app/controllers/items'),
    multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty()
;

module.exports = function(app) {
// Article Routes
app.route('/api/items')
    .get(items.all)
    .post(users.requiresLogin, items.create)
;
app.route('/api/items/mine')
    .get(users.requiresLogin, items.allMine)
;
app.route('/api/items/photo')
    .post(users.requiresLogin, multipartyMiddleware, items.uploadPhoto)
;
app.route('/api/items/photo/:imageId')
    .delete(users.requiresLogin, items.hasImageAuthorization, items.deletePhoto)
;
app.route('/api/items/request')
    .post(users.requiresLogin, items.requestItem)
;
app.route('/api/requests')
    .get(users.requiresLogin, items.listRequests)
;
app.route('/api/requests/:requestId')
    .get(users.requiresLogin, items.loadRequest)
    .post(users.requiresLogin, items.postMessage)
    .put(users.requiresLogin, items.approveRequest)
;
app.route('/api/items/:itemId')
    .get(items.show)
    .put(users.requiresLogin, items.hasAuthorization, items.update)
    .delete(users.requiresLogin, items.hasAuthorization, items.destroy)
;
// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('itemId', items.item);
app.param('imageId', items.image);
app.param('requestId', items.request);
};
