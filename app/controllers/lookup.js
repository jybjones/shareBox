/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * List of States
 */
exports.allStates = function(req, res) {
    db.state.findAll({order: [['state', 'ASC']]}).then(function(states){
        var statesLookup = [];
        states.forEach(function(state){
            statesLookup.push({id: state.id, code: state.code, state: state.state});
        });
        return res.jsonp(statesLookup);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * List of Categories
 */
exports.allCategories = function(req, res) {
    db.category.findAll({order: [['name', 'ASC']]}).then(function(categories){
        var categoryLookup = [];
        categories.forEach(function(category){
            categoryLookup.push({id: category.id, name: category.name, description: category.description});
        });
        return res.jsonp(categoryLookup);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * List of Conditions
 */
exports.allConditions = function(req, res) {
    db.condition.findAll({order: [['name', 'ASC']]}).then(function(conditions){
        var conditionsLookup = [];
        conditions.forEach(function(condition){
            conditionsLookup.push({id: condition.id, name: condition.name, description: condition.description});
        });
        return res.jsonp(conditionsLookup);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
