angular.module('myApp')
  .component('login', {
    templateUrl: 'app/components/login/login.tpl.html',
    controller: ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
      $scope.submit = () => {
        $http.post('/login', { username: $scope.login, password: $scope.password })
              .then(res => {
                if (res.data) {
                  $rootScope.$broadcast('authenticated', { username: res.data.username });
                }
              });
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
          $elem.replaceWith(`<a ui-sref=users/${data.username} href="/users/${data.username}">${data.username}</a>`);
          $compile($elem)($scope);
        });
      }
    }
  }]);
