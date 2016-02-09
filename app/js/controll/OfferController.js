'use strict';
//
// AuhtRestFull API: Модуль спец. предложения
//
var OfferControllers = angular.module('OfferControllers', ['LocalStorageModule']);

// Показать спец. предложения
OfferControllers.controller('OfferListCtrl', ['$scope', '$http', 'localStorageService',
function($scope, $http, localStorageService) {
  var offer = localStorageService.get('offer');

    if (offer == null) {
      $http.jsonp('http://localhost/offer?callback=JSON_CALLBACK').
        success(function(data) {
          $scope.Offers = data;
           localStorageService.set('offer',data);
        });
    }else{
      $scope.Offers = offer;
    }
}]);
