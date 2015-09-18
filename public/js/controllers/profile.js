angular.module('sharebox.profile').controller('ProfileController', ['$scope', '$routeParams', '$location', 'Global', 'Profile', function ($scope, $routeParams, $location, Global, Profile) {
    $scope.global = Global;
    //
    //$scope.create = function() {
    //    var article = new Articles({
    //        title: this.title,
    //        content: this.content
    //    });
    //
    //    article.$save(function(response) {
    //        console.log(response);
    //        $location.path("articles/" + response.id);
    //    });
    //
    //    this.title = "";
    //    this.content = "";
    //};
    //
    //$scope.remove = function(article) {
    //    if (article) {
    //        article.$remove();
    //
    //        for (var i in $scope.articles) {
    //            if ($scope.articles[i] == article) {
    //                $scope.articles.splice(i, 1);
    //            }
    //        }
    //    }
    //    else {
    //        $scope.article.$remove();
    //        $location.path('articles');
    //    }
    //};
    //
    //$scope.update = function() {
    //    var article = $scope.article;
    //    if (!article.updated) {
    //        article.updated = [];
    //    }
    //    article.updated.push(new Date().getTime());
    //
    //    article.$update(function() {
    //        $location.path('articles/' + article.id);
    //    });
    //};

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
                }, 1000
            );

        }).error(function(err){
            // Error State
        });
    };

    //$scope.findOne = function() {
    //    Articles.get({
    //        articleId: $routeParams.articleId
    //    }, function(article) {
    //        $scope.article = article;
    //    });
    //};
    $scope.load();
}]);
