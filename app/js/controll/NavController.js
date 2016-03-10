'use strict';
//
// AuhtRestFull API: Модуль Категории каталога
//
var NavControllers = angular.module('NavControllers', ['LocalStorageModule']);

// Показать категории
  NavControllers.controller('GetNavCtrl', ['$scope', 'localStorageService', '$location', 'Config',
    function ($scope, localStorageService, $location, Config) {

      var data = localStorageService.get('nav');

      if (data == null) {
        $location.path('/');
        $scope.server = "Ошибка! Неудается загрузить категории.";
      }else{
        $scope.getdata = data;
      }


  


  }]);
