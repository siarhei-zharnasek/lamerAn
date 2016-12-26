angular.module('myApp')
    .component('listArticles', {
        templateUrl: 'app/components/listArticles/listArticles.tpl.html',
        controller: ['$scope', 'getArticles', '$http', function($scope, getArticles, $http) {
            function setArticles() {
                getArticles.getData().then(() => $scope.articles = getArticles.articles);
            }
            setArticles();
            $scope.$on('dataUpdated', setArticles);

            $scope.increaseRating = function(id, rating) {
                rating++;
                $http.put(`/articles/${id}`, { rating }).then(() => setArticles());
            };

            $scope.decreaseRating = function(id, rating) {
                if (rating !== 0) {
                    rating--;
                    $http.put(`/articles/${id}`, { rating }).then(() => setArticles());
                }
            };
        }]
    });
