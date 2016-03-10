'use strict';

var AppCtrl = angular.module('AppCtrl', [
 'ngRoute',
 'ArticleControllers',
 'AuhtControllers',
 'NavControllers',
 'FooterControllers',
 'OfferControllers',
 'AppConfig',
 'ngCart'
]);

AppCtrl.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('AppCtrl');
});

AppCtrl.run(function($rootScope, $location, localStorageService, Config) {

  $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.showSection = $location.path() !== "/";
  });

  // localStorageService.clearAll();

  var dataCat = Config.CategoryGet(
    function success() {
      localStorageService.set('nav', dataCat);
  },function err() {
      $rootScope.server = "Ошибка! Неудается загрузить категории.";
  });

  var dataOffer = Config.OfferGet(
    function success() {
      localStorageService.set('offer', dataOffer);
  },function err() {
      $rootScope.server = "Ошибка! Неудается загрузить предложения.";
  });






});

  AppCtrl.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.
        when('/', {
          templateUrl: 'tpl/auht.html',
		      controller: 'Auht'
		  }).
        when('/offer', {
          templateUrl: 'tpl/OfferList.html',
          controller: 'OfferListCtrl'
		  }).
		  when('/category/:CatId', {
		      templateUrl: 'tpl/CatList.html',
          controller: 'CatListCtrl'
        }).
        when('/article/:ArticleId', {
          templateUrl: 'tpl/ArticleDetail.html',
          controller: 'ArticleDetailCtrl'
        }).
        otherwise({

        });
  }]);
