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
            templateUrl: 'views/home.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
//////////Profile View////////
        when('/profile', {
            templateUrl: 'views/profile/view.html'
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
