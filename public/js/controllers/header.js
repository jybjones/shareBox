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
        "link": "items/listItems"
    },
    {
        "title": "Post New Item",
        "link": "items/create"
    },
    {
        "title": "View My Items",
        "link": "items/listMyItems"
    }];

    $scope.isCollapsed = false;
}]);
