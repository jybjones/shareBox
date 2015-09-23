angular.module('sharebox.items').controller('ItemsController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', 'Global', 'Items', 'Upload', 'Lookup', function ($rootScope, $scope, $routeParams, $location, $timeout, Global, Items, Upload, Lookup) {
    $scope.global = Global;
    $scope.files = [];
    $scope.uploadPattern = 'image/*';
    $scope.uploadAccept = 'image/*';
    $scope.capture = 'camera';
    //$scope.dropAvailable = true;

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
        $scope.files = [];
        $scope.newItem = {
            name: null,
            description: null
        };
    };

    $scope.create = function() {
        var item = $scope.newItem;
        item.images = [];
        angular.forEach($scope.files, function(file){
            item.images.push(file.result);
        });
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
        item.images = [];
        angular.forEach($scope.files, function(file){
            item.images.push(file.result);
        });

        Items.updateItem(item).success(function(item){
            console.log(item);
            $location.path("items/"+item.id);
            $rootScope.$apply();
        }).error(function(err){
            // Error State
        });
    };

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
            $scope.item = {};
            $location.path("items");
            $rootScope.$apply();
        }).error(function(err){
            // Error State
        });
    };

    $scope.removeImage = function(imageId){
        Items.deleteImage(imageId).success(function(image){
            var itemId = image.itemId;
            Items.getItem(itemId).success(function(item){
                $scope.item = item;
            }).error(function(err){
                // Error State Item fetch failed.
            });
        }).error(function(err){
            // Error State Image Delete Failed
        });
    };

    $scope.removeUpload = function(hashKey, sourceArray){
        angular.forEach(sourceArray, function(obj, index){
            // sourceArray is a reference to the original array passed to ng-repeat,
            // rather than the filtered version.
            // 1. compare the target object's hashKey to the current member of the iterable:
            if (obj.$$hashKey === hashKey) {
                // remove the matching item from the array
                sourceArray.splice(index, 1);
                // and exit the loop right away
                return;
            }
        });
    };

    $scope.uploadFiles = function(files){
        angular.forEach(files, function(file) {
            if (file && !file.$error) {
                file.upload = Upload.upload({
                    url: '/api/items/photo',
                    file: file
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response);
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        });
    };

    $scope.loadCategories = function(){
        Lookup.getCategories().success(function(categories){
            $scope.categories = categories;
        }).error(function(err){

        });
    };

    $scope.loadConditions = function(){
        Lookup.getConditions().success(function(conditions){
            $scope.conditions = conditions;
        }).error(function(err){

        });
    };

    $scope.loadCategories();
    $scope.loadConditions();
}]);
