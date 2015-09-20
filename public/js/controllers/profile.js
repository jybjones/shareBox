angular.module('sharebox.profile').controller('ProfileController', ['$rootScope', '$scope', '$routeParams', '$location', 'Global', 'Profile', function ($rootScope, $scope, $routeParams, $location, Global, Profile) {
    $scope.global = Global;

    $scope.load = function() {
        Profile.getProfile().success(function(profile){
            $scope.profile = profile;
        }).error(function(err){
            // Error State
        });
    };

    $scope.updateProfile = function() {
        //console.log($scope.profile);
        jQuery('#profileSubmitButton').html('Saving...');
        Profile.updateProfile($scope.profile).success(function(profile){
            // Put redirect to show here.
            $scope.profile = profile;
            setTimeout(
                function(){
                    jQuery('#profileSubmitButton').html('Save');
                    $location.path('/home');
                    $rootScope.$apply();
                }, 1000
            );

        }).error(function(err){
            // Error State
        });
    };

    $scope.load();
}]);
