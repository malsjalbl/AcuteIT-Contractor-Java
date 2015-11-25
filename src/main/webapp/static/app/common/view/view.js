
var viewModule = angular.module('view', []);

/*MESSAGING SERVICE*
 *******************/

viewModule.factory('viewService', 
	 
	function($route, $location) {
	
		var viewfactory = {};
		
		viewfactory.reloadCurrentView = function() {
			
			$route.reload();
		};
		
		viewfactory.setUrl = function(url) {
			
			$location.path(url);
		};
		
		return viewfactory;
	}
);