var viewModule = angular.module('app.spinner', []);

viewModule.run(function($templateCache, $http) {
	$http.get('static/app/common/spinner/ajax-loader.gif', {cache:$templateCache});
});
 
/*MESSAGING SERVICE*
 *******************/

viewModule.factory('spinnerService', 
	 
	function() {
	
		var spinnerFactory = {};
		
		var spinner = {isVisible: false, src: 'static/app/common/spinner/ajax-loader.gif'};
		
		spinnerFactory.isVisible = function(state) {
			
			spinner.isVisible = state;
		};
		
		spinnerFactory.getSpinner = function() {
			
			return spinner;
		};
		
		return spinnerFactory;
	}
);

viewModule.controller('SpinnerCtrl', function($scope, spinnerService) {
	
	$scope.spinner = spinnerService.getSpinner();
	//$scope.$watchCollection('spinner', function() {$scope.});
});