'use strict';

var ArticleControllers = angular.module('ArticleControllers', [
'slick',
'LocalStorageModule'
]);


	// Показать одно блюдо
ArticleControllers.controller('ArticleDetailCtrl', ['$rootScope', '$scope', '$routeParams', '$http', 'localStorageService', '$timeout', 'Config',
  function($rootScope, $scope, $routeParams, $http, localStorageService, $timeout, Config) {


    var data = localStorageService.get('article-'+ $routeParams.ArticleId);

    if (data == null) {
      var dataArticle = Config.ArticleGet({id:$routeParams.ArticleId},
        function success() {
          localStorageService.set('article-' + $routeParams.ArticleId, dataArticle);
            $scope.Article = angular.fromJson(dataArticle[0]);
        },function err() {
          $scope.data = "Эта категория еще не заполнена.";
        });

        }else{
        $scope.Article = angular.fromJson(data[0]);
        }

        $scope.mcount = function() {
          var count = $scope.count;

          if (count => 0){
          $scope.count = $scope.count - 1;
        }else{

        };
        };

}]);


	// Показать все блюда категории
ArticleControllers.controller('CatListCtrl', ['$scope', '$routeParams', 'localStorageService', 'Config',
  function($scope, $routeParams, localStorageService, Config) {

    var data = localStorageService.get('articles-'+ $routeParams.CatId);

    if (data == null) {
      var dataArticle = Config.ArticleCatGet({id:$routeParams.CatId},
        function success() {
          localStorageService.set('articles-' + $routeParams.CatId, dataArticle);
            $scope.getdata = dataArticle;
      },function err() {
          $scope.data = "Эта категория еще не заполнена.";
      });

    }else{
      $scope.getdata = data;
    }

}]);
