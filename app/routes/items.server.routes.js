
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
items = require('../../app/controllers/items');

module.exports = function(app) {
// Article Routes
app.route('/api/items')
    .get(items.all)
    .post(users.requiresLogin, items.create)
;
app.route('/api/items/:itemId')
    //.get(items.show)
    .put(users.requiresLogin, items.hasAuthorization, items.update)
    .delete(users.requiresLogin, items.hasAuthorization, items.destroy)
;

app.route('/api/items/mine')
    .get(users.requiresLogin, items.allMine)
;
// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('itemId', items.item);
};