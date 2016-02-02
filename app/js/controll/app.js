'use strict';

var menucat = angular.module('menucat', [
 'ngRoute',
 'ArticleControllers',
 'ngCookies'

]);
  menucat.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
        when('/auht', {
          templateUrl: 'tpl/auht.html',
		  controller: 'Auht'
		  }).
        when('/auht/:Pin', {
          templateUrl: 'tpl/user.html',
          controller: 'Login'
		  }).
		when('/auht/cookie/:uid/:name', {
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