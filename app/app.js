// import 'angular';
// import 'angular-ui-router';
// import 'angular-cookies';

angular.module('myApp', ['ui.router', 'ngCookies'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    //$urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/'
      })
      .state('submit', {
        url: '/submit',
        template: '<submit></submit>'
      })
      .state('article', {
        url: '/article/:id',
        template: '<article></article>'
      })
      .state('latest', {
        url: '/latest',
        template: '<article></article>'
      })
      .state('top', {
        url: '/top',
        template: '<article></article>'
      })
      .state('random', {
        url: '/random',
        template: '<article></article>'
      })
      .state('users', {
        url: '/users/:username',
        template: '<user></user>'
      })
      .state('login', {
        url: '/login',
        template: '<login></login>'
      })
      .state('register', {
        url: '/register',
        template: '<login></login>'
      });

    // $urlRouterProvider.when('/home', '/');
    $locationProvider.html5Mode({
      enabled: true
    });
  }])
  .service('getArticles', ['$http', function($http) {
    this.getData = () => $http.get('articles').then(articles => this.articles = articles.data);
  }])
  .service('CurrentUser', function() {
    this.getUser = () => this.user;
    this.setUser = user => this.user = user;
  });
