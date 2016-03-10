'use strict';
//
// AuhtRestFull API: Модуль спец. предложения
//
var OfferControllers = angular.module('OfferControllers', ['LocalStorageModule']);

// Показать спец. предложения
  OfferControllers.controller('OfferListCtrl', ['$scope', 'localStorageService', '$location', 'Config',
    function ($scope, localStorageService, $location, Config) {

      var data = localStorageService.get('offer');

      if (data == null) {
        $location.path('/');
        $scope.server = "Ошибка! Неудается загрузить предложения.";
      }else{
        $scope.getdata = data;
      }

  }]);
