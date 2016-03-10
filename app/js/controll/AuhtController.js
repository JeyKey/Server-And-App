'use strict';
//
// AuhtRestFull API: Модуль Авторизации
//
var AuhtControllers = angular.module('AuhtControllers', [
  'LocalStorageModule'
]);

//
// AuhtRestFull API: Контроллер Авторизации
//
AuhtControllers.controller('Auht', ['$rootScope', '$scope', '$routeParams', '$http', '$location', '$timeout', 'localStorageService', '$interval', 'Config',
  function($rootScope, $scope, $routeParams, $http, $location, $timeout, localStorageService, $interval, Config) {



    var Session = Config.AuhtGet(
        function success() {
          $scope.server = "Сервер доступен";
          $scope.status = "online";
        },
        function err() {
          $timeout(function() {
                 $location.path('/');

          }, 300);
          $scope.status = "offline";
          $scope.server = "Сервер не доступен.";

        });


// Авторизация: проверка Pin, выдача AppUsers
  $scope.getUid = function(PinValue) {
      $scope.error = "";

      var AuhtPin = Config.AuhtPut({pin:PinValue},
        function success(status) {
                 $scope.hidden = "hidden";
                 $scope.uidList = AuhtPin;
        },
        function err(status) {
          if (status.status == 400) {
            $scope.error =  "Ошибка! Неверный пин-код.";
          }else{
            $scope.error =  "Ошибка! Неудается подключиться к серверу.";
          };
        });
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
      $timeout(function() {
             $location.path('/offer');
      }, 300);





  };
}]);
