'use strict';

var ArticleControllers = angular.module('ArticleControllers', [
'slick',
'LocalStorageModule'
]);


	// Показать одно блюдо
ArticleControllers.controller('ArticleDetailCtrl', ['$rootScope', '$scope', '$routeParams', '$http', 'localStorageService', '$timeout',
  function($rootScope, $scope, $routeParams, $http, localStorageService, $timeout) {


    $http.jsonp('http://localhost/article/' + $routeParams.ArticleId + '?callback=JSON_CALLBACK').
    success(function(data) {
      $scope.Article = angular.fromJson(data[0]);
   });


}]);


	// Показать все блюда категории
ArticleControllers.controller('CatListCtrl', ['$rootScope', '$scope', '$routeParams', '$http', '$timeout',
  function($rootScope, $scope, $routeParams, $http, $timeout) {

    $http.jsonp('http://localhost/category/' + $routeParams.CatId + '?callback=JSON_CALLBACK').success(function(data) {
      $scope.CatList = data;
   }).
   error(function(data, status) {
        $scope.data = data || "Эта категория еще не заполнена";
    });

}]);
