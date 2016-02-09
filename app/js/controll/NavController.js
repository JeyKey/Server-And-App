'use strict';
//
// AuhtRestFull API: Модуль Категории каталога
//
var NavControllers = angular.module('NavControllers', ['LocalStorageModule']);

// Показать категории
NavControllers.controller('GetNavCtrl', ['$scope', '$http', 'localStorageService',
  function ($scope, $http, localStorageService) {
    var nav = localStorageService.get('nav');

    if (nav == null) {
      $http.jsonp('http://localhost/category?callback=JSON_CALLBACK').
           success(function(data) {
               $scope.nav = data;
               localStorageService.set('nav',data);
             });
      }else{
      $scope.nav = nav;
      }
}]);
