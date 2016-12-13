angular.module('ArticleService', [])
  .service('ArticleService', ['$http', function($http) {
    return this.getArticles = () => $http.get('/articles');
  }]);
