angular.module('sharebox.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;


    $scope.myInterval = 6000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    var slides = $scope.slides = [
      {
        image: '/img/landing/share1.jpg',
        text: 'Sh@reBox'
      },

      {
        image: '/img/landing/share2.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share3.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share4.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share5.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share6.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share7.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share8.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share9.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share10.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share11.jpg',
        // text: 'Description Of Slide'
      },
      {
        image: '/img/landing/share12.jpg',
        // text: 'Description Of Slide'
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
