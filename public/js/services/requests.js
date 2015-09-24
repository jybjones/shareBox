//Articles service used for articles REST endpoint
angular.module('sharebox.items').factory("ItemRequest", ['$http', function($http) {
    var urlBase = '/api/requests';
    var requestsFactory = {};

    requestsFactory.getRequests = function(){
        return $http.get(urlBase);
    };
    requestsFactory.getRequest = function(requestId){
        return $http.get(urlBase+"/"+requestId);
    };
    requestsFactory.postNewMessage = function(requestId, message){
        return $http.post(urlBase+"/"+requestId, message);
    };
    requestsFactory.approveRequest = function(requestId){
        return $http.put(urlBase+"/"+requestId);
    };
    return requestsFactory;
}]);
