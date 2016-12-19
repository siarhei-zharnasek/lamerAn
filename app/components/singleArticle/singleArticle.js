angular.module('myApp')
  .component('article', {
    templateUrl: 'app/components/singleArticle/singleArticle.tpl.html',
    controller: ['$scope', '$stateParams', 'getArticles', '$state', '$http', '$rootScope', function($scope, $stateParams, getArticles, $state, $http, $rootScope) {
      let state = $state.current.name
      if (state === 'latest') {
        getArticles.getData().then(() => {
          $scope.article = getArticles.articles.pop();
        });
      } else if (state === 'random') {
        getArticles.getData().then(() => {
          let articles = getArticles.articles;
          let randomNumber = Math.floor(Math.random() * articles.length);
          $scope.article = articles[randomNumber];
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

      $scope.toggleCommentForm = function() {
        $scope.isShowCommentForm = !$scope.isShowCommentForm;
      }

      $scope.submitComment = function(comment) {
        $http.put(`/articles/comment/${$stateParams.id}`, { comment }).then(() => {
          $rootScope.$broadcast('dataUpdated');
          $state.go('article', {}, { reload: true })
          $scope.toggleCommentForm();
        });
      }
    }]
  });
