angular.module('myApp')
  .component('article', {
    templateUrl: 'app/components/singleArticle/singleArticle.tpl.html',
    controller: ['$scope', '$stateParams', 'getArticles', '$state', function($scope, $stateParams, getArticles, $state) {
      if ($state.current.name === 'latest') {
        getArticles.getData().then(() => {
          $scope.article = getArticles.articles.pop();
        });
      } else {
        const ID = $stateParams.id;
        function setArticles() {
          getArticles.getData().then(() => {
            $scope.article = getArticles.articles.filter(article => article._id === ID)[0];
          });
        }
        setArticles();
        $scope.$on('dataUpdated', setArticles);
      }
    }]
  });
