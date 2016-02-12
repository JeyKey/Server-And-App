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
  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
});

AppCtrl.run(function($rootScope, $location, localStorageService) {
  $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.showSection = $location.path() !== "/";
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
        redirectTo: '/'
        });
  }]);
