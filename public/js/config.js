//Setting up route
angular.module('sharebox').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/profile', {
            templateUrl: 'views/profile/show.html'
        }).
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/home', {
            templateUrl: 'views/items/listItems.html' // 'views/home.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
//////////Profile View////////
        when('/profile', {
            templateUrl: 'views/profile/view.html'
        }).

//////////Items View////////
        when('/items/listMyItems', {
            templateUrl: 'views/items/listMyItems.html' ///ALL MY items
        }).
        when('/items/create', {
            templateUrl: 'views/items/createItem.html'
        }).
        when('/items/:itemId/edit', {
            templateUrl: 'views/items/editItem.html'
        }).
        when('/items/:itemId', {
            templateUrl: 'views/items/viewItem.html' //SINGLE items
        }).
        when('/items', {
            templateUrl: 'views/items/listItems.html' //ALL items
        }).
//////////Requests View////////
        when('/requests', {
            templateUrl: 'views/requests/listRequests.html' ///ALL MY requests
        }).
        when('/requests/:requestId', {
            templateUrl: 'views/requests/viewRequest.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('sharebox').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
