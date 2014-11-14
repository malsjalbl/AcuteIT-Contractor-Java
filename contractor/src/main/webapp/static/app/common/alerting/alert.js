var alertModule = angular.module('alerting', ['ui.bootstrap']);
 
alertModule.factory('alertService',
	 
	function($alert) {
	
		var alertFactory = {};
		
		alertFactory.alert = function() {
			
			return $alert({title: 'Holy guacamole!', content: 'Best check yo self, you\'re not looking too good.', placement: 'top', type: 'info', show: true});
		};
		
		return alertFactory;
	}
);

