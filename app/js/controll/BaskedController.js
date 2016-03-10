'use strict';
//
// AuhtRestFull API: Модуль Корзины
//
AppCtrl.controller('BaskedController', ['$rootScope','$scope', 'ngCart', 'localStorageService', 'ngCartItem', 'store',
  function($rootScope, $scope, ngCart, localStorageService, ngCartItem, store ) {
    var uid = localStorageService.get('uid');

    ngCart.setTaxRate(10);
    ngCart.setUid(uid);

    $rootScope.showSection2 = false;

    $scope.getCart = function() {
      $rootScope.showMask = true;
      $rootScope.showCart = true;
      $rootScope.showCartBlur = "has-active-menu-blur";
    };

    $rootScope.exitCart = function() {
      $rootScope.showMask = false;
      $rootScope.showCart = false;
      $rootScope.showCartBlur = "";
    };

    $scope.Checkout = function() {
      $rootScope.showMask = false;
      $rootScope.Checkout = false;
      $rootScope.showCartBlur = "";
    };

    $scope.getofi = function() {
      $rootScope.showMask = true;
      $rootScope.showCartBlur = "has-active-menu-blur";
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
