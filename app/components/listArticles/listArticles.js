angular.module('myApp')
    .component('listArticles', {
        templateUrl: 'app/components/listArticles/listArticles.tpl.html',
        controller: ['$scope', 'getArticles', '$http', 'CurrentUser', '$rootScope', function($scope, getArticles, $http, CurrentUser, $rootScope) {
            function setArticles() {
                getArticles.getData().then(() => {
                    setLikes();
                    $scope.articles = getArticles.articles;
                });
            }

            function setLikes() {
                $scope.userLikes = CurrentUser.getUser() ? CurrentUser.getUser().likes : [];
                $scope.userDislikes = CurrentUser.getUser() ? CurrentUser.getUser().dislikes : [];
            }
            
            setArticles();
            $scope.$on('dataUpdated', setArticles);

            $scope.increaseRating = function(id, rating) {
                let userSession = CurrentUser.getUser();
                if (userSession && !userSession.likes.includes(id) && !userSession.dislikes.includes(id)) {
                    rating++;
                    $http.put(`/users/${userSession.username}`, { like: id })
                        .then($http.put(`/articles/${id}`, { rating }))
                        .then(() => setArticles());

                    userSession.likes.push(id);
                    CurrentUser.setUser(userSession);
                    $rootScope.$broadcast('dataUpdated');
                }
            };

            $scope.decreaseRating = function(id, rating) {
                let userSession = CurrentUser.getUser();
                if (userSession && rating !== 0 && !userSession.likes.includes(id) && !userSession.dislikes.includes(id)) {
                    rating--;
                    $http.put(`/users/${userSession.username}`, { dislike: id })
                        .then($http.put(`/articles/${id}`, { rating }))
                        .then(() => setArticles());

                    userSession.dislikes.push(id);
                    CurrentUser.setUser(userSession);
                    $rootScope.$broadcast('dataUpdated');
                }
            };
        }]
    });
