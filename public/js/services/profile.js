//Articles service used for articles REST endpoint
angular.module('sharebox.profile').factory("Profile", ['$http', function($http) {
    //return $resource('api/profile/:profileId', {
    //    profileId: '@id'
    //}, {
    //    update: {
    //        method: 'PUT'
    //    }
    //});

    var urlBase = '/api/profile';
    var profileFactory = {};

    profileFactory.getProfile = function(){
        return $http.get(urlBase);
    };

    profileFactory.updateProfile = function(profile){
        return $http.put(urlBase, profile);
    };

    return profileFactory;
}]);
