'use strict';
//
// AuhtRestFull API: Модуль Категории каталога
//
var FooterControllers = angular.module('FooterControllers', ['LocalStorageModule']);


FooterControllers.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('Auht');
  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
});

FooterControllers.controller('Footer', ['$scope', '$routeParams', 'localStorageService',
function ($scope, $routeParams, localStorageService) {

   $scope.localStorageName = localStorageService.get('name');


}]);
