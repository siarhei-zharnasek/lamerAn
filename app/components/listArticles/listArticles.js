angular.module('myApp')
  .component('listArticles', {
    templateUrl: 'app/components/listArticles/listArticles.tpl.html',
    controller: ['$scope', 'getArticles', function($scope, getArticles) {
      function setArticles() {
        getArticles.getData().then(() => $scope.articles = getArticles.articles);
      }
      setArticles();;
      $scope.$on('dataUpdated', setArticles);
    }]
  });
