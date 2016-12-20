angular.module('myApp')
  .component('login', {
    templateUrl: 'app/components/login/login.tpl.html',
    controller: ['$scope', '$http', '$rootScope', 'CurrentUser', '$state', function($scope, $http, $rootScope, CurrentUser, $state) {
      $scope.submit = (login, password) => {
        if ($state.current.name === 'login') {
          $http.post('/login', { username: login, password: password })
                .then(res => {
                  if (res.data) {
                    CurrentUser.setUser(res.data.username);
                    $rootScope.$broadcast('authenticated', { username: res.data.username });
                  } else {
                    $state.go('login');
                  }
                });
        } else {
          $http.post(`/users/${login}`, { username: login, password })
                .then(() => {
                  CurrentUser.setUser(login);
                  $rootScope.$broadcast('authenticated', { username: login });
                });
        }
        $scope.login = '';
        $scope.password = '';
      };
    }]
  })
  .directive('loginCheck', ['$compile', '$state', function($compile, $state) {
    return {
      restrict: 'A',
      link: function($scope, $elem, $attr) {
        $scope.$on('authenticated', (res, data) => {
          if (data) {
            $elem.replaceWith(`<a ui-sref=users/${data.username} href="/users/${data.username}">${data.username}</a>`);
          } else {
            // TODO: LOGOUT not working
            $elem.replaceWith(`<a ui-sref=login href="/login">Login</a>`);
          }
          $compile($elem)($scope);
          $state.go('home');
        });
      }
    }
  }]);
