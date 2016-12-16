angular.module('myApp')
  .component('login', {
    templateUrl: 'app/components/login/login.tpl.html',
    controller: ['$scope', '$http', function($scope, $http) {

    }]
  })
  .directive('loginCheck', [function() {
    return {
      restrict: 'A',
      link: function($scope, $elem) {
      }
    }
  }]);
