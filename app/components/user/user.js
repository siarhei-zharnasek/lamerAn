angular.module('myApp')
  .component('user', {
    templateUrl: 'app/components/user/user.tpl.html',
    controller: ['$scope', '$http', '$stateParams', 'CurrentUser', '$rootScope', function($scope, $http, $stateParams, CurrentUser, $rootScope) {
      $http.get(`/users/${$stateParams.username}`).then(user => {
        $scope.user = user.data;
        if (CurrentUser.getUser() !== $scope.user.username) {
          $scope.user.password = '***';
        }
      });

      $scope.logout = function() {
        $http.get('/logout').then(() => {
          CurrentUser.setUser();
          $rootScope.$broadcast('authenticated');
          $state.go('home'); console.log(CurrentUser);
        });
      }
    }]
  });
