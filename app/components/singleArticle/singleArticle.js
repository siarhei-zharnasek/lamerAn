angular.module('myApp')
  .component('article', {
    templateUrl: 'app/components/singleArticle/singleArticle.tpl.html',
    controller: ['$scope', '$stateParams', 'getArticles', '$state', '$http', '$rootScope', 'CurrentUser', function($scope, $stateParams, getArticles, $state, $http, $rootScope, CurrentUser) {
      let state = $state.current.name;
      const ID = $stateParams.id;
      if (state === 'latest') {
        getArticles.getData().then(() => {
          $scope.article = getArticles.articles.pop();
        });
      } else if (state === 'random') {
        getArticles.getData().then(() => {
          let articles = getArticles.articles;
          let randomNumber = Math.floor(Math.random() * articles.length);
          $scope.article = articles[randomNumber];
          $state.go('article', { id: $scope.article._id });
        });
      } else {
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

      $scope.submitComment = function(comment, title) {
        if (!CurrentUser.getUser()) {
          return $state.go('login');
        }
        $http.put(`/articles/comment/${ID}`, { comment, title }).then(() => {
          $rootScope.$broadcast('dataUpdated');
          $state.go('article', {}, { reload: true });
          $scope.toggleCommentForm();
        });
      }

      $scope.deleteArticle = function() {
        if (!CurrentUser.getUser()) {
          return $state.go('login');
        }
        $http.delete(`/articles/${ID}`).then(() => {
          $rootScope.$broadcast('dataUpdated');
          $state.go('home', {}, { reload: true });
        });
      }
    }]
  });
