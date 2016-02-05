'use strict';

var menucat = angular.module('menucat', [
 'ngRoute',
 'ArticleControllers',
 'ngCookies',
 'ngImageCache'
]);
  menucat.config(['$routeProvider', 'ImageCacheProvider',
  function($routeProvider, ImageCacheProvider) {
	ImageCacheProvider.setStorage(window.localStorage);

    $routeProvider.
        when('/auht', {
          templateUrl: 'tpl/auht.html',
		  controller: 'Auht'
		  }).
        when('/auht/:Pin', {
          templateUrl: 'tpl/user.html',
          controller: 'Login'
		  }).
		when('/auht/cookie/:uid', {
		  templateUrl: 'tpl/OfferList.html',
          controller: 'cookie'
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
          redirectTo: '/auht'
        });
  }]);
