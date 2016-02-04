'use strict';

var ArticleControllers = angular.module('ArticleControllers', [ 'ngCookies']);

// Caching the river...
ArticleControllers.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
});

	// Показать спец. предложения
ArticleControllers.controller('OfferListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.jsonp('http://localhost/offer?callback=JSON_CALLBACK').success(function(data) {
      $scope.Offers = data;
   });

}]);

	// Показать одно блюдо
ArticleControllers.controller('ArticleDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.jsonp('http://localhost/article/' + $routeParams.ArticleId + '?callback=JSON_CALLBACK').success(function(data) {
      $scope.Article = data;
   });
  
}]);
  
	// Показать категории
ArticleControllers.controller('GetCatCtrl', ['$scope', '$http',
  function ($scope, $http) {
   $http.jsonp('http://localhost/category?callback=JSON_CALLBACK').
        success(function(data) {
            $scope.Cats = data;
    });
}]);


	// Показать все блюда категории
ArticleControllers.controller('CatListCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.jsonp('http://localhost/category/' + $routeParams.CatId + '?callback=JSON_CALLBACK').success(function(data) {
      $scope.CatList = data;
   }).
   error(function(data, status) {
        $scope.data = data || "Эта категория еще не заполнена";
    });
}]);


//
// AuhtRestFull API: Контроллеры Авторизации 
//

	// Авторизация проверка Pin
ArticleControllers.controller('Auht', ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {
	
	$http.jsonp('http://localhost/?callback=JSON_CALLBACK').
	success(function(data) {
       $scope.data = data || "Сервер доступен";
   }).
   error(function(data, status) {
        $scope.data = data || "Нет соединения с сервером";
		
    });
	
	$scope.getItem = function() {
		  
    $http.jsonp('http://localhost/auht?pin=' + $scope.pin + '&token=a3ca5cf04464775a3ca0e1d2944d5f43875b2507&callback=JSON_CALLBACK').
	
	success(function(data) {
      $location.path('/auht/' + $scope.pin);
   }).
   error(function(data, status) {
        $scope.data = data || "Неверный пин-код";
		
    });
	}
}]);

	// Авторизация выбор пользователя
ArticleControllers.controller('Login', ['$scope', '$routeParams', '$http', '$location', '$cookies',
  function($scope, $routeParams, $http, $location, $cookies) { 
    $http.jsonp('http://localhost/auht?pin=' + $routeParams.Pin + '&token=a3ca5cf04464775a3ca0e1d2944d5f43875b2507&callback=JSON_CALLBACK').
	success(function(data) {
      
	  $scope.uidList = data;

   }).
   error(function(data, status) {
        $scope.data = data || "Пользователи еще не созданы";
    });

}]);


	// Авторизация cookies
ArticleControllers.controller('cookie', ['$scope', '$routeParams', '$http', '$location', '$cookies',
  function($scope, $routeParams, $http, $location, $cookies) { 

		$cookies.put('uid', + $routeParams.uid);
		$cookies.put('uid2', + $routeParams.uid);
		
		$location.path('/offer');
}]);

