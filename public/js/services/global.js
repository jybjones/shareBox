//Global service for global variables
angular.module('sharebox.system').factory("Global", ['$http',
    function($http) {
        var globalObject = {};

        globalObject.user = window.user;
        globalObject.authenticated = !! window.user;
        globalObject.updateUser = function(){
            $http.get('/users/me').success(function(user){
                console.log(user);
                globalObject.user = user;
            }).error(function(err){
                // Error State
            });
        };

        return globalObject;
    }
]);
