angular.module('myApp')
  .component('article', {
    templateUrl: 'app/components/singleArticle/singleArticle.tpl.html',
    controller: ['$scope', '$stateParams', 'getArticles', function($scope, $stateParams, getArticles) {
      const ID = $stateParams.id;
      let articles;
      if (!getArticles.articles) {
        getArticles.getData().then(() => articles = getArticles.articles);
      } else {
        articles = getArticles.articles;
      }
      $scope.article = articles.filter(article => article._id === ID);
    }]
  });
