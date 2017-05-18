angular.module('enthrall').controller('presentController', function(presentService) {


  $scope.slickConfig = {
    enabled: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 3000,
    accessibility: true,
    dots: true,
    method: {},
    event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
        }
    }
};


  // get cat facts
  $scope.getFacts = function() {
    presentService.getFacts()
    .then(function(resp) {
      $scope.facts = resp;
    })
  }
  $scope.getFacts();


})
