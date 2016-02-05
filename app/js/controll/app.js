'use strict';

var AppCtrl = angular.module('AppCtrl', [
 'ngRoute',
 'ngImageCache',
 'ArticleControllers',
 'AuhtControllers',
 'CatControllers',
 'FooterControllers'
]);

AppCtrl.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.showSection = $location.path() !== "/";
  });
});

  AppCtrl.config(['$routeProvider', 'ImageCacheProvider',
  function($routeProvider, ImageCacheProvider) {
	ImageCacheProvider.setStorage(window.localStorage);

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
        });
  }]);
