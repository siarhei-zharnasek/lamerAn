angular.module('myApp', ['lamer'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    // $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/home.html'
      })
      .state('submit', {
        url: '/submit',
        templateUrl: 'app/views/submit.html'
      });

    // $urlRouterProvider.when('', '/home');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
