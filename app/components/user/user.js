angular.module('myApp')
  .component('user', {
    templateUrl: 'app/components/user/user.tpl.html',
    controller: ['$scope', '$http', '$stateParams', 'getCurrentUser', function($scope, $http, $stateParams, getCurrentUser) {
      $http.get(`/users/${$stateParams.username}`).then(user => { console.log(user);
        $scope.user = user.data;
        if (getCurrentUser.getUser() !== $scope.user.username) {
          $scope.user.password = '***';
        }
      });
    }]
  });
