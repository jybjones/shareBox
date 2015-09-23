//Articles service used for articles REST endpoint
angular.module('sharebox.profile').factory("Lookup", ['$http', function($http) {
    //return $resource('api/profile/:profileId', {
    //    profileId: '@id'
    //}, {
    //    update: {
    //        method: 'PUT'
    //    }
    //});

    var urlBase = '/api/lookup';
    var profileFactory = {};

    profileFactory.getStates = function(){
        return $http.get(urlBase+"/states");
    };

    profileFactory.getCategories = function(){
        return $http.get(urlBase+"/categories");
    };

    profileFactory.getConditions = function(){
        return $http.get(urlBase+"/conditions");
    };

    return profileFactory;
}]);
