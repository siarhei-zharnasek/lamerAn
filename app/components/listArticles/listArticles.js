angular.module('myApp')
  .component('listArticles', {
    templateUrl: 'app/components/listArticles/listArticles.tpl.html',
    controller: ['$scope', 'getArticles', function($scope, getArticles) {
      if (!getArticles.articles) {
        getArticles.getData().then(() => $scope.articles = getArticles.articles);
      } else {
        $scope.articles = getArticles.articles;
      }
    }]
  });
