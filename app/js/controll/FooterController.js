'use strict';
//
// AuhtRestFull API: Модуль Категории каталога
//
var FooterControllers = angular.module('FooterControllers', ['LocalStorageModule']);

  FooterControllers.controller('Footer', ['$rootScope', '$scope', 'localStorageService', '$location',
    function ($rootScope, $scope, localStorageService, $location) {

      var data = localStorageService.get('name');

      if(data == null){
        $location.path('/');
      }else{
        $scope.localStorageName = localStorageService.get('name');
      };

      $rootScope.doTheBack = function() {
        if($location.path() == "/offer") {} else { window.history.back(); };
      };

 }]);
