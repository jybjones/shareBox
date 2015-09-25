angular.module('sharebox.items').controller('ItemsController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$q', 'Global', 'Items', 'Upload', 'Lookup', function ($rootScope, $scope, $routeParams, $location, $timeout, $q, Global, Items, Upload, Lookup) {
    $scope.global = Global;
    $scope.map = null;
    $scope.item = {};
    $scope.itemLoaded = false;
    $scope.files = [];
    $scope.uploadPattern = 'image/*';
    $scope.uploadAccept = 'image/*';
    $scope.capture = 'camera';
    //$scope.dropAvailable = true;
    var dateDisableDeferred =  $q.defer();
    $scope.dateDisablePromise = dateDisableDeferred.promise;
    $scope.emptyRequest = {
        startDate: null,
        endDate: null,
        message: null
    };
    $scope.request = JSON.parse(JSON.stringify($scope.emptyRequest));
    $scope.status = {
        opened: false
    };
    $scope.dateOptions = {
        formatYear: 'yy'
    };
    $scope.minDate = new Date();
    $scope.TZOffsetString = '';

    $scope.buildTZOffsetString = function(){
        var pad = '00';
        var date = new Date();
        var offset = date.getTimezoneOffset();
        var offsetString = (offset > 0 ? "-" : "+")+("0"+(offset/60)).slice(-2)+":"+("0"+(offset%60)).slice(-2);
        $scope.TZOffsetString = offsetString;
    };
    $scope.buildTZOffsetString();

    $scope.cleanDate = function(dateString){
        if(dateString[dateString.length-1] == 'Z'){
            // Is Zulu time, convert to Browser Timezone.
            dateString = dateString.slice(0, -1)+$scope.TZOffsetString;
        }
        return dateString;
    };

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
        item.podId = $scope.global.user.Profile.podId;
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
            $scope.itemLoaded = true;
            dateDisableDeferred.notify(new Date().getTime());
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

    $scope.borrowRequest = function(){
        console.log($scope.newRequest);
        var doUpdate = false;
        // Get Start Date
        var startDate = $scope.newRequest.startDate;
        // Get End Date
        var endDate = $scope.newRequest.endDate;
        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        // Validate Both dates Selected
        if(startDate != null && endDate != null) {
            // Validate End Date After Start Date
            if(endDate.getTime() >= startDate.getTime()) {
                // Validate All Dates between Start and End are non-booked
                if($scope.item.requests.length == 0){
                    doUpdate = true;
                }else {
                    for (var i = 0; i < $scope.item.requests.length; i++) {
                        var eventStartDay = new Date($scope.cleanDate($scope.item.requests[i].startDate));
                        var eventEndDay = new Date($scope.cleanDate($scope.item.requests[i].endDate));
                        eventStartDay.setHours(0, 0, 0, 0);
                        eventEndDay.setHours(0, 0, 0, 0);

                        if (startDate.getTime() <= eventStartDay.getTime() && endDate.getTime() >= eventStartDay.getTime()) {
                            // Bad Overlap
                            doUpdate = false;
                        } else if (startDate.getTime <= eventEndDay.getTime() && endDate.getTime() >= eventEndDay.getTime()) {
                            // Bad Overlap
                            doUpdate = false;
                        } else {
                            doUpdate = true;
                        }
                    }
                }
            }
        }else{
            // Something is not set!
        }

        if(doUpdate){
            // Submit Request to Server and update Item Object.
            console.log("SUCCESSFULLY BOOKED ITEM");
            $scope.newRequest.itemId = $scope.item.id;
            $scope.newRequest.LenderProfileId = $scope.item.userProfileId;
            console.log($scope.newRequest);
            var request = $scope.newRequest;

            Items.bookItem(request).success(function(item){
                // Put redirect to show here.
                $timeout(function(){
                    $scope.newRequest = JSON.parse(JSON.stringify($scope.emptyRequest));
                    console.log(item);
                    $scope.$broadcast('refreshDatepickers');
                    $location.path("items"); // /" + item.id);
                    $rootScope.$apply();
                }, 50);
            }).error(function(err){
                // Error State
            });
        }
    };

    $scope.getDayClass = function(date, mode) {
        // Return color class for booked dates.
        // This If Breaks the static calendar. @TODO
        //if($scope.itemLoaded) {
            if (mode === 'day') {
                var dayToCheck = new Date(date);

                for (var i = 0; i < $scope.item.requests.length; i++) {
                    var startDay = new Date($scope.cleanDate($scope.item.requests[i].startDate));
                    var endDay = new Date($scope.cleanDate($scope.item.requests[i].endDate));
                    startDay.setHours(0,0,0,0);
                    endDay.setHours(0,0,0,0);

                    if (dayToCheck.getTime() >= startDay.getTime() && dayToCheck.getTime() <= endDay.getTime()) {
                        return 'itemBooked';
                    }
                }
            }
        //}
        return '';
    };

    $scope.disabled = function(date, mode) {
        // Return true for booked dates.
        if($scope.itemLoaded) {
            if (mode === 'day') {
                var dayToCheck = new Date(date);
                dayToCheck.setHours(0,0,0,0);

                for (var i = 0; i < $scope.item.requests.length; i++) {
                    var startDay = new Date($scope.cleanDate($scope.item.requests[i].startDate));
                    var endDay = new Date($scope.cleanDate($scope.item.requests[i].endDate));
                    startDay.setHours(0,0,0,0);
                    endDay.setHours(0,0,0,0);

                    if (dayToCheck.getTime() >= startDay.getTime() && dayToCheck.getTime() <= endDay.getTime()) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };

    $scope.open = function($event) {
        $event.stopPropagation();
        $scope.status.opened = true;
    };

    $scope.drawMap = function(){
        console.log("DRAW MAP");
        $scope.map = new GMaps({
            el: '#map',
            lat: $scope.global.user.Profile.pod.lat,
            lng: $scope.global.user.Profile.pod.lng
        });
        $scope.map.addMarker({
            lat: $scope.global.user.Profile.pod.lat,
            lng: $scope.global.user.Profile.pod.lng
        });
        //$('#geocoding_form').submit(function(e){
        //    e.preventDefault();
        //    GMaps.geocode({
        //        address: $('#address').val().trim(),
        //        callback: function(results, status){
        //            if(status=='OK'){
        //                var latlng = results[0].geometry.location;
        //                map.setCenter(latlng.lat(), latlng.lng());
        //                map.addMarker({
        //                    lat: latlng.lat(),
        //                    lng: latlng.lng()
        //                });
        //            }
        //        }
        //    });
        //});
    };

    $scope.today();
    $scope.loadCategories();
    $scope.loadConditions();
}]);