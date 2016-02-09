'use strict';
//
// AuhtRestFull API: Модуль Авторизации
//
var AuhtControllers = angular.module('AuhtControllers', [ 'LocalStorageModule']);

//
// AuhtRestFull API: Контроллер Авторизации
//
AuhtControllers.controller('Auht', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'localStorageService', '$interval',
  function($scope, $routeParams, $http, $location, $timeout, localStorageService, $interval) {


    $scope.localStorageUid = localStorageService.get('uid');
    $scope.localStorageName = localStorageService.get('name');

    $http.jsonp('http://localhost/?callback=JSON_CALLBACK').
      success(function(data) {

        $scope.server = "Сервер доступен";
        $scope.status = "online";

      }).error(function(data, status) {
        $scope.server = "Нет соединения с сервером";
        $scope.status = "offline";
        $scope.error = "Ошибка! Неудается подключиться к серверу.";

      });

    $interval(function() {
        $http.jsonp('http://localhost/?callback=JSON_CALLBACK').
          success(function(data) {

            $scope.server = "Сервер доступен";
            $scope.status = "online";
            $scope.error = "";

          }).error(function(data, status) {
            $scope.server = "Нет соединения с сервером";
            $scope.status = "offline";
            $scope.error = "Ошибка! Неудается подключиться к серверу.";

          });
    }, 30000);

// Авторизация: проверка Pin, выдача AppUsers
    $scope.getUid = function() {
      $scope.error = "";
      $timeout(function() {
      $http.jsonp('http://localhost/auht?pin=' + $scope.pin + '&token=a3ca5cf04464775a3ca0e1d2944d5f43875b2507&callback=JSON_CALLBACK').
      success(function(data) {
        
        localStorageService.clearAll();

        $timeout(function() {
          $scope.hidden = "hidden";
          $scope.uidList = data;
        }, 300);

      }). error(function(data, status) {
        var pin = $scope.pin;
          if (pin == null) {
            $scope.error = "Ошибка! Введите пин-код.";

          }else{
            $scope.error = data || "Ошибка! Неверный пин-код.";
          }

      });
    }, 300);
  };

// Авторизация: Цифровая клавиатура
  $scope.GetNum = function(i) {
    if (!isNaN($('#PinInput').val())) {
      if (parseInt($('#PinInput').val()) === null) {
        $scope.pin = i
      } else {
        $scope.pin = $('#PinInput').val() + i;
      }
    }};

    $scope.GetDel = function(i) {
      $('#PinInput').val($('#PinInput').val().substring(0,$('#PinInput').val().length - 1));
      $timeout(function() {
        $scope.pin = $('#PinInput').val();
      }, 10);
    };

    $scope.GetClear = function(i) {
      $('#PinInput').val('');
      $timeout(function() {
        $scope.pin = $('#PinInput').val();
      }, 10);
    };


// Авторизация: Добавление Данных пользователя + Редирект в основу приложения
  $scope.getApp = function(uid, name) {
      localStorageService.set('uid',uid);
      localStorageService.set('name',name);
      $location.path('/offer');
  };
}]);
