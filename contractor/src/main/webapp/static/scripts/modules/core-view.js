
var dataModule = angular.module('core-view', []);
 
/*MESSAGING SERVICE*
 *******************/

dataModule.factory('viewService', 
	 
	function($route, $location) {
	
		var factory = {};
		
		factory.reloadCurrentView = function() {
			
			$route.reload();
		};
		
		factory.setViewUrl = function(url) {
			
			$location.path(url);
		};
		
		return factory;
	}
);