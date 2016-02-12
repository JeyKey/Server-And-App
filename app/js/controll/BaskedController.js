'use strict';
//
// AuhtRestFull API: Модуль Авторизации
//

//
// AuhtRestFull API: Контроллер Авторизации
//
AppCtrl.controller('BaskedController', ['$rootScope','$scope', '$http', 'ngCart', 'localStorageService', 'ngCartItem', 'store',
  function($rootScope, $scope, $http, ngCart, localStorageService, ngCartItem, store) {
    var uid = localStorageService.get('uid');

    ngCart.setTaxRate(10);
    ngCart.setUid(uid);

    $rootScope.showSection2 = false;

    $scope.getCart = function() {
      $rootScope.showCart = true;
      $rootScope.showCartBlur = "has-active-menu-blur";
    };

    $rootScope.exitCart = function() {
      $rootScope.showCart = false;
      $rootScope.showCartBlur = "";
    };

    $scope.Checkout = function() {
      $rootScope.Checkout = false;
      $rootScope.showCartBlur = "";
    };

    $rootScope.RemoveCart = function() {
      localStorageService.remove('cart');
      if (angular.isObject(store.get('AppCtrl.cart'))) {
          ngCart.$restore(store.get('AppCtrl.cart'));

      } else {
          ngCart.init();
      }
    };

}]);
