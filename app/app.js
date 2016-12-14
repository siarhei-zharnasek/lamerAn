angular.module('myApp', ['lamer'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    // $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/views/home.html'
      });

    // $urlRouterProvider.when('', '/home');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
