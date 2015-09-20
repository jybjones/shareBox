
angular.module('sharebox.items').controller('ItemsController', ['$rootScope', '$scope', '$routeParams', '$location', 'Global', 'Items', function ($rootScope, $scope, $routeParams, $location, Global, Items) {
    $scope.global = Global;

    $scope.loadAll = function() {
        Items.getItems().success(function(items){
            $scope.items = items;
        }).error(function(err){
            // Error State
        });
    };

    $scope.loadMine = function() {
        Items.getMyItems().success(function(items){
            $scope.myItems = items;
        }).error(function(err){
            // Error State
        });
    };

    $scope.newItem = function(){
        $scope.newItem = {
            name: null,
            description: null
        };
    }

    $scope.create = function() {
        var item = $scope.newItem;

        Items.createItem(item).success(function(item){
            // Put redirect to show here.
            console.log(item);
            $location.path("items/" + item.id);
            $rootScope.$apply();
        }).error(function(err){
            // Error State
        });
    };

    $scope.update = function(){
        var item = $scope.item;

        Items.updateItem(item).success(function(item){
            console.log(item);
            $location.path("items/"+item.id);
            $rootScope.$apply();
        }).error(function(err){
            // Error State
        });
    }

    $scope.findOne = function(){
        Items.getItem($routeParams.itemId).success(function(item){
            console.log(item);
            $scope.item = item;
        }).error(function(err){
            // Error State
        });
    };

    $scope.remove = function(){
        Items.deleteItem($routeParams.itemId).success(function(item){
            console.log(item);
            $scope.item = {};
            $location.path("items");
            $rootScope.$apply();
        }).error(function(err){
            // Error State
        });
    };

}]);
