var alertModule = angular.module('alerting', ['ui.bootstrap']);
 
alertModule.factory('alertService',
	 
	function() {
	
		var alerts = [];
		var alertFactory = {};
		
		alertFactory.getAlerts = function() {
			
			return alerts;
		};
		
		alertFactory.addAlert = function(options) {
			
			alerts.push({type: angular.isDefined(options.title) ? options.type : 'success',
						 msg: angular.isDefined(options.msg) ? options.msg : 'No message defined.'});
		};
		
		alertFactory.closeAlert = function(index) {
			
		    alerts.splice(index, 1);
		  };
		
		return alertFactory;
	}
);

alertModule.controller('AlertCtrl',
		
	function($scope, alertService) {
	
		$scope.alerts = alertService.getAlerts();
		
		$scope.closeAlert = function(index) {
		    $scope.alerts.splice(index, 1);
		};
	}
);
