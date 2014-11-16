
var viewModule = angular.module('view', []);

viewModule.run(function($templateCache, $http) {
	$http.get('static/app/common/view/ajax-loader.gif', {cache:$templateCache});
});
 
/*MESSAGING SERVICE*
 *******************/

viewModule.factory('ViewService', 
	 
	function($route, $location) {
	
		var viewfactory = {};
		
		var spinner = {state: false, src: 'static/app/common/view/ajax-loader.gif'};
		
		viewfactory.reloadCurrentView = function() {
			
			$route.reload();
		};
		
		viewfactory.setUrl = function(url) {
			
			$location.path(url);
		};
		
		viewfactory.setSpinnerState = function(state) {
			
			spinner.state = state;
		};
		
		viewfactory.getSpinnerState = function() {
			
			return spinner.state;
		};
		
		viewfactory.setSpinnerSrc = function(src) {
			
			spinner.src = src;
		};
		
		viewfactory.getSpinnerSrc = function() {
			
			return spinner.src;
		};
		
		viewfactory.getSpinner = function() {
			
			return spinner;
		};
		
		return viewfactory;
	}
);

viewModule.controller('ViewCtrl', function($scope, viewService) {
	
	$scope.viewService = viewService;
	//$scope.$watchCollection('spinner', function() {$scope.});
});