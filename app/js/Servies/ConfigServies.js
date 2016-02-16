'use strict';

var AppConfig = angular.module('AppConfig', ['ngResource']);
    AppConfig.factory('Config', ['$resource', function($resource){

      var UrlValue = "http://localhost/";
      var TokenValue = "a3ca5cf04464775a3ca0e1d2944d5f43875b2507";

            return  $resource(UrlValue+':url', {}, {
                    query: {method:'GET', params:{url:'auht', token:TokenValue}, isArray:true},
                    get: {method:'GET', params:{}, isArray:true}
                });
    }]);
