angular.module('sharebox.profile').controller('profileController', ['$scope', '$routeParams', '$location', 'Global', function ($scope, $routeParams, $location, Global) {
    $scope.global = Global;

    $scope.create = function() {
        var profile = new Profile({
            firstName: this.firstName,
            lastName: this.lastName,
            content: this.content
        });

        profile.$save(function(response) {
            console.log(response);
            $location.path("profile/" + response.id);
        });

        this.firstName = "";
        this.content = "";
    };

    $scope.remove = function(profile) {
        if (profile) {
            profile.$remove();

            for (var i in $scope.profile) {
                if ($scope.profile[i] == profile) {
                    $scope.profile.splice(i, 1);
                }
            }
        }
        else {
            $scope.profile.$remove();
            $location.path('profile');
        }
    };

    $scope.update = function() {
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article.id);
        });
    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.articles = articles;
        });
    };

    $scope.findOne = function() {
        Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };
}]);
