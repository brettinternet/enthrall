var app = angular.module('enthrall', ['firebaseConfig', 'ui.router', 'slickCarousel', 'luegg.directives', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ng-showdown']);

// insert firebase config as firebaseConfig

// routing
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/landing.html',
      controller: 'mainController'
    })
    .state('setup', {
      url: '/setup',
      templateUrl: '/views/setup.html',
      controller: 'mainController'
    })
    .state('present', {
      url: '/present/:urlId/:presTitle',
      templateUrl: '/views/present.html',
      controller: 'mainController'
    })

  $urlRouterProvider
    .otherwise('/');
})
