'use strict';

var ArticleControllers = angular.module('ArticleControllers', [
'slick'
]);

// Caching the river...
ArticleControllers.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
});

	// Показать спец. предложения
ArticleControllers.controller('OfferListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.jsonp('http://localhost/offer?callback=JSON_CALLBACK').success(function(data) {
      $scope.Offers = data;
   });

}]);

	// Показать одно блюдо
ArticleControllers.controller('ArticleDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.jsonp('http://localhost/article/' + $routeParams.ArticleId + '?callback=JSON_CALLBACK').success(function(data) {
      $scope.Article = data;
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
