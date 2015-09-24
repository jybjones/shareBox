angular.module('sharebox.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Create New Article",
        "link": "articles/create"
    },
     {
        "title": "View All Items",
        "link": "items"
    },
    {
        "title": "Post New Item",
        "link": "items/create"
    },
    {
        "title": "View My Items",
        "link": "items/listMyItems"
    },{
        "title": "View Requests",
        "link": "requests"
    }];

    $scope.isCollapsed = false;

    $scope.$on('$routeChangeSuccess', function () {
        $scope.navCollapsed = true;
    });
}]);
