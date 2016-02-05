'use strict';
//
// AuhtRestFull API: Модуль Категории каталога
//
var CatControllers = angular.module('CatControllers', []);

// Показать категории
CatControllers.controller('GetCatCtrl', ['$scope', '$routeParams', '$http',
function ($scope, $routeParams, $http) {
 $http.jsonp('http://localhost/category?callback=JSON_CALLBACK').
      success(function(data) {
          $scope.Cats = data;
  });
}]);
