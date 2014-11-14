
var dataModule = angular.module('view', []);
 
/*MESSAGING SERVICE*
 *******************/

dataModule.factory('viewService', 
	 
	function($route, $location) {
	
		var viewServicefactory = {};
		
		viewServicefactory.reloadCurrentView = function() {
			
			$route.reload();
		};
		
		viewServicefactory.setUrl = function(url) {
			
			$location.path(url);
		};
		
		return viewServicefactory;
	}
);