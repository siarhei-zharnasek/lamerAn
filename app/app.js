// import 'angular';
// import 'angular-ui-router';
// import 'angular-cookies';

angular.module('myApp', ['ui.router', 'ngCookies'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    // $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/',
        template: '<list-articles></list-articles>'
      })
      .state('submit', {
        url: '/submit',
        templateUrl: 'app/views/submit.html'
      })
      .state('article', {
        url: '/article/:id',
        template: '<article></article>'
      });

    // $urlRouterProvider.when('', '/home');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }])
  .service('getArticles', ['$http', function($http) {
    this.getData = () => {
      if (!this.articles) {
        return $http.get('articles').then(data => this.articles = data.data);
      } else {
        return this.articles;
      }
    }
  }]);
