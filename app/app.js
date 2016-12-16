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
        templateUrl: 'app/views/submit.html'
      })
      .state('article', {
        url: '/article/:id',
        template: '<article></article>'
      })
      .state('users', {
        url: '/users/:username',
        template: '<user></user>'
      })
      .state('login', {
        url: '/login',
        template: '<login></login>'
      });

    // $urlRouterProvider.when('/home', '/');
    $locationProvider.html5Mode({
      enabled: true
    });
  }])
  .service('getArticles', ['$http', function($http) {
    this.getData = () => $http.get('articles').then(data => this.articles = data.data);
  }])
  .service('getCurrentUser', function() {
    this.getUser = () => this.user;
    this.setUser = user => this.user = user;
  })
  .controller('formController', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope) {
    $scope.submit = function() {
      $http.post('/articles', { title: $scope.title, link: $scope.link })
            .then(() => {
              $rootScope.$broadcast('dataUpdated');
              $state.go('home', {}, { reload: true });
            });
    }
  }]);
