angular.module('myApp')
  .component('submit', {
    templateUrl: 'app/components/submit/submit.tpl.html',
    controller: ['$scope', '$http', '$state', '$rootScope', 'getCurrentUser', function($scope, $http, $state, $rootScope, getCurrentUser) {
      if (!getCurrentUser.getUser()) {
        $state.go('login');
      }
      $scope.submit = function() {
        $http.post('/articles', { title: $scope.title, link: $scope.link, author: getCurrentUser.getUser() })
              .then(() => {
                $rootScope.$broadcast('dataUpdated');
                $state.go('home', {}, { reload: true });
              });
      }
    }]
  });
