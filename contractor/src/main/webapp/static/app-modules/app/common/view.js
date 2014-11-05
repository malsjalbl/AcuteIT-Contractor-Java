
var dataModule = angular.module('view', []);
 
/*MESSAGING SERVICE*
 *******************/

dataModule.factory('viewService', 
	 
	function($route, $location) {
	
		var factory = {};
		
		factory.reloadCurrentView = function() {
			
			$route.reload();
		};
		
		factory.setUrl = function(url) {
			
			$location.path(url);
		};
		
		return factory;
	}
);