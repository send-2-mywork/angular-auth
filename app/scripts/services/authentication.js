'use strict';

/**
 * @ngdoc service
 * @name authApp.Authentication
 * @description
 * # Authentication
 * Service in the authApp.
 */
angular.module('authApp')
  .service('Authentication', function ($q, $http, $timeout, $location) {

  	var authenticatedUser = null;
    return {
    	requestUser: function(){
    		var deferred = $q.defer();

    		$http.get('/api/user.json').success(function(user){
    			console.log(user);	
    			/*authenticatedUser = user;
  				deferred.resolve(user);*/
    			$timeout(function(){
    				authenticatedUser = user;
    				deferred.resolve(user);
    			}, 1000);
    			
    		}).error(function(error){
    			deferred.reject(error);
    		});
 				return deferred.promise;   		
    	},
    	getUser: function(){
    		return authenticatedUser;
    	},
    	exists: function(){
    		return authenticatedUser;
    	},
    	login: function(credentials){
    		var deferred = $q.defer();
    		$http('/auth/login', credentials).success(function(user){
    			if(user != null){
    				authenticatedUser = user;
    				deferred.resolve(user);
    			} else {
    				deferred.reject('Given credentials are incorrect.');
    			}
    			
    		}).error(function(error){
    			deferred.reject(error);
    		});
    		return deferred.promise;
    	},
    	logout: function(){
    		authenticatedUser = null;
    	},
    	isDeveloper: function(){
    		return this.exists() && authenticatedUser.type == 'developer';
    	}
    }
  });
 