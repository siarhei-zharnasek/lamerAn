angular.module('myApp')
  .component('article', {
    templateUrl: 'app/components/singleArticle/singleArticle.tpl.html',
    controller: ['$scope', '$stateParams', 'getArticles', function($scope, $stateParams, getArticles) {
      const ID = $stateParams.id;
      function setArticles() {
        getArticles.getData().then(() => {
          $scope.article = getArticles.articles.filter(article => article._id === ID)[0];
        });
      }
      setArticles();
      $scope.$on('dataUpdated', setArticles);
    }]
  });
