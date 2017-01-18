angular.module('myApp')
    .component('listArticles', {
        templateUrl: 'app/components/listArticles/listArticles.tpl.html',
        controller: ['$scope', 'getArticles', '$http', 'CurrentUser', '$rootScope', function($scope, getArticles, $http, CurrentUser, $rootScope) {
            function setArticles() {
                getArticles.getData().then(() => $scope.articles = getArticles.articles);
            }
            setArticles();
            $scope.$on('dataUpdated', setArticles);

            $scope.increaseRating = function(id, rating) {
                if (CurrentUser.getUser()) {
                    rating++;
                    $http.put(`/articles/${id}`, { rating }).then(() => setArticles());
                    $rootScope.$broadcast('dataUpdated');
                }
            };

            $scope.decreaseRating = function(id, rating) {
                if (CurrentUser.getUser() && rating !== 0) {
                    rating--;
                    $http.put(`/articles/${id}`, { rating }).then(() => setArticles());
                    $rootScope.$broadcast('dataUpdated');
                }
            };
        }]
    });
