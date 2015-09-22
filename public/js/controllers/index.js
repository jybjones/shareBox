angular.module('sharebox.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;


    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    var slides = $scope.slides = [
      {
        image: '/img/landing/share1.png',
        text: 'Sh@reBox'
      },

      {
        image: '/img/landing/share2.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share3.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share4.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share5.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share6.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share7.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share8.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share9.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share10.png',
        text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share11.png',
        text: 'Description Of Slide'
      }

      // {
      //   image: '/img/burEat.gif',
      //   text: 'Description Of Second Slide'
      // }
    ];
//     $scope.addSlide = function() {
//       var newWidth = 600 + slides.length + 1;
//       slides.push({
//         image: '//placekitten.com/' + newWidth + '/300',
//         text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
//           ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
//       });
//     };
//     for (var i=0; i<4; i++) {
//       $scope.addSlide();
//     }
//     console.log(slides);
}]);
