'use strict';
//
// AuhtRestFull API: Модуль Авторизации
//
var AuhtControllers = angular.module('AuhtControllers', [
  'LocalStorageModule',
  'AppConfig'
]);

//
// AuhtRestFull API: Контроллер Авторизации
//
AuhtControllers.controller('Auht', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'localStorageService', '$interval', 'Config',
  function($scope, $routeParams, $http, $location, $timeout, localStorageService, $interval, Config) {


    $scope.localStorageUid = localStorageService.get('uid');
    $scope.localStorageName = localStorageService.get('name');

    var AuhtPin = localStorageService.get('status')
      if (AuhtPin == 200) {
        $scope.server = "Сервер доступен";
        $scope.status = "online";

      }else{
        $scope.server = "Нет соединения с сервером";
        $scope.status = "offline";
        $scope.error = "Ошибка! Неудается подключиться к серверу.";

      };



// Авторизация: проверка Pin, выдача AppUsers
  $scope.getUid = function(PinValue) {
      $scope.error = "";

      var AuhtPin = Config.query({pin:PinValue},
        function success(status) {
                localStorageService.clearAll();
          $timeout(function() {
                 $scope.hidden = "hidden";
                 $scope.uidList = AuhtPin;

          }, 300);
        },
        function err(status) {
          if (status.status == 400) {
            $scope.error =  "Ошибка! Неверный пин-код.";
          }else{
            $scope.error =  "Ошибка! Сервер недоступен.";
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
