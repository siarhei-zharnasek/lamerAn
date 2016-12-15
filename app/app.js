// import 'angular';
// import 'angular-ui-router';
// import 'angular-cookies';

angular.module('myApp', ['ui.router', 'ngCookies'])
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
      })
      .state('article', {
        url: '/article',
        template: '<article></article>'
      });

    // $urlRouterProvider.when('', '/home');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
