'use strict';

/**
 * @ngdoc overview
 * @name authApp
 * @description
 * # authApp
 *
 * Main module of the application.
 */
angular
  .module('authApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/loading', {
        templateUrl: 'views/loading.html',
        controller: 'LoadingCtrl',
        controllerAs: 'loading'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(Authentication, ApplicationService, $rootScope, $location, RouteFilter){
    Authentication.requestUser().then(function(){
      ApplicationService.makeReady();
    });

    $rootScope.$on('$locationChangeStart', function(scope, next, current){
      if($location.path() === '/loading') return;
      if(!ApplicationService.isReady()){
        $location.path('loading');
      }

      RouteFilter.run($location.path());
    });
  });
