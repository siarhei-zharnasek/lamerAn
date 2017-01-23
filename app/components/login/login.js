angular.module('myApp')
  .component('login', {
    templateUrl: 'app/components/login/login.tpl.html',
    controller: ['$scope', '$http', '$rootScope', 'CurrentUser', '$state', function($scope, $http, $rootScope, CurrentUser, $state) {
      $scope.currentState = $state.current.name;

      $scope.submit = (username, password) => {
        if ($state.current.name === 'login') {
          $http.post('/login', { username, password })
                .then(res => {
                  if (res.data) {
                    CurrentUser.setUser(res.data.user);
                    $rootScope.$broadcast('authenticated', { username });
                    $rootScope.$broadcast('dataUpdated');
                  }
                }, () => {
                  $scope.registerErr = true;
                  $scope.validationErr = 'Invalid username or password. Please, try again.'
                });
        } else {
          $http.post(`/users/${username}`, { username, password })
                .then((res) => {
                  if (res.data) {
                    CurrentUser.setUser(res.data.user);
                    $rootScope.$broadcast('authenticated', { username });
                  } else {
                    $scope.registerErr = true;
                    $scope.validationErr = 'There is another person with this username. Please, try again.'
                  }
                });
        }
      };
    }]
  })
  .directive('loginCheck', ['$state', function($state) {
    return {
      restrict: 'A',
      link: function($scope, $elem, $attr) {
        $scope.$on('authenticated', (res, data) => {
          if (data) {
            $scope.isLogined = true;
            $scope.username = data.username;
          } else {
            $scope.isLogined = false;
          }
          $state.go('home');
        });
      }
    }
  }]);
