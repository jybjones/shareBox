angular.module('sharebox.items').controller('RequestsController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$q', 'Global', 'ItemRequest', 'Upload', 'Lookup', function ($rootScope, $scope, $routeParams, $location, $timeout, $q, Global, ItemRequest, Upload, Lookup) {
    $scope.global = Global;
    $scope.item = {};
    $scope.itemLoaded = false;
    $scope.requests = {};
    $scope.emptyMessage = {
        requestId: null,
        message: null,
        fromId: null,
        toId: null
    };
    $scope.newMessage = JSON.parse(JSON.stringify($scope.emptyMessage));

    $scope.findRequest = function(){
        ItemRequest.getRequest($routeParams.requestId).success(function(request){
            console.log(request);
            $scope.item = request.item;
            $scope.itemLoaded = true;
            $scope.request = request;
        }).error(function(err){
            // Error State
        });
    };

    $scope.sendMessage = function(){
        var request = $scope.request;
        var global = $scope.global;
        if($scope.newMessage != null){
            $scope.newMessage.requestId = request.id;
            $scope.newMessage.FromId = global.user.Profile.id;
            // Am I the requester or the lender?
            if(global.user.Profile.id == request.item.userProfileId){
                // I am the lender!
                $scope.newMessage.ToId = request.RequesterProfile.id;
            }else if(global.user.Profile.id == request.RequesterProfile.id){
                // I am the borrower!
                $scope.newMessage.ToId = request.item.userProfileId;
            }
            ItemRequest.postNewMessage(request.id, $scope.newMessage).success(function(request){
                $scope.newMessage = JSON.parse(JSON.stringify($scope.emptyMessage));
                $scope.item = request.item;
                $scope.request = request;
            }).error(function(err){
                // Error State
            });
        }
    };

    $scope.loadAll = function(){
        ItemRequest.getRequests().success(function(requests){
            $scope.requests = requests;
        }).error(function(err){
            // Error State
        });
    };

    $scope.approveRequest = function(){
        var requestId = $routeParams.requestId;
        ItemRequest.approveRequest(requestId).success(function(request){
            $scope.newMessage = JSON.parse(JSON.stringify($scope.emptyMessage));
            $scope.item = request.item;
            $scope.request = request;
        }).error(function(err){
            // Error State
        });
    }
}]);