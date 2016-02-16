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

FooterControllers.controller('Footer', ['$rootScope', '$scope', '$routeParams', 'localStorageService',
function ($rootScope, $scope, $routeParams, localStorageService) {

   $scope.localStorageName = localStorageService.get('name');

   $rootScope.doTheBack = function() {
     window.history.back();
   };


}]);
