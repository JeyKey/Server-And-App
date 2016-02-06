'use strict';
//
// AuhtRestFull API: Модуль Авторизации
//
var AuhtControllers = angular.module('AuhtControllers', [ 'LocalStorageModule']);

//
// AuhtRestFull API: Контроллер Авторизации
//
AuhtControllers.controller('Auht', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'localStorageService',
  function($scope, $routeParams, $http, $location, $timeout, localStorageService) {

    $scope.localStorageUid = localStorageService.get('uid');
    $scope.localStorageName = localStorageService.get('name');


// Авторизация: проверка соедиения с сервером
    $http.jsonp('http://localhost/?callback=JSON_CALLBACK').
      success(function(data) {
       localStorageService.clearAll();

        $scope.data = "Сервер доступен";

      }).error(function(data, status) {
        $scope.data = "Нет соединения с сервером";

      });

// Авторизация: проверка Pin, выдача AppUsers
    $scope.getUid = function() {
      $http.jsonp('http://localhost/auht?pin=' + $scope.pin + '&token=a3ca5cf04464775a3ca0e1d2944d5f43875b2507&callback=JSON_CALLBACK').
      success(function(data) {
        $timeout(function() {
          $scope.hidden = "hidden";
          $scope.uidList = data;
        }, 300);

      }). error(function(data, status) {
      $scope.data = data || "Неверный пин-код";

      });
    }

// Авторизация: Добавление Данных пользователя + Редирект в основу приложения
  $scope.getApp = function(uid, name) {
      localStorageService.set('uid',uid);
      localStorageService.set('name',name);
      $location.path('/offer');
  }

}]);
