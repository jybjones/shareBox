//Articles service used for articles REST endpoint
angular.module('sharebox.profile').factory("profile", ['$resource', function($resource) {
    return $resource('profile/:profileId', {
        profileId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
