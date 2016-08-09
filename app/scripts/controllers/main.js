'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the authApp
 */
angular.module('authApp')
  .controller('MainCtrl', function ($scope, Authentication, RouteFilter) {
    
    console.log(Authentication.getUser());
    $scope.canAccess = function(route){
    	return RouteFilter.canAccess(route);
    }
    
  });
