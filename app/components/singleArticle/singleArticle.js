angular.module('myApp')
  .component('article', {
    templateUrl: './singleArticle.tpl.html',
    controller: function($scope) {
      $scope.test = 'test';
    }
  });
