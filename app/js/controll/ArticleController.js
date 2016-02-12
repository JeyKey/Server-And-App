'use strict';

var ArticleControllers = angular.module('ArticleControllers', [
'slick',
'LocalStorageModule'
]);


	// Показать одно блюдо
ArticleControllers.controller('ArticleDetailCtrl', ['$scope', '$routeParams', '$http', 'localStorageService',
  function($scope, $routeParams, $http, localStorageService) {
    $http.jsonp('http://localhost/article/' + $routeParams.ArticleId + '?callback=JSON_CALLBACK').
    success(function(data) {
      $scope.Article = angular.fromJson(data[0]);
   });


}]);


	// Показать все блюда категории
ArticleControllers.controller('CatListCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.jsonp('http://localhost/category/' + $routeParams.CatId + '?callback=JSON_CALLBACK').success(function(data) {
      $scope.CatList = data;
   }).
   error(function(data, status) {
        $scope.data = data || "Эта категория еще не заполнена";
    });
}]);
