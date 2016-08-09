'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:LoadingCtrl
 * @description
 * # LoadingCtrl
 * Controller of the authApp
 */
angular.module('authApp')
  .controller('LoadingCtrl', function ($scope, ApplicationService, $location) {
    ApplicationService.registerListener(function(){
    	// When application is ready then redirect to the main page.
    	$location.path('/');
    });
  });
