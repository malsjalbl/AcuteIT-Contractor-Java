var mainModule = angular.module('main', ['ngAnimate','contract']);

mainModule.value('defaultModule', 0);

mainModule.run(
		
	/* function(mainService) {
		
		mainService.registerModule({
			
			displayName:	'Mileage',
			homeUrl:		'#/mileages',
			views:			[{displayName: 'Vehicle List', homeUrl: '#/vehicles'},		
			      			 {displayName: 'Journey List', homeUrl: '#/journeys'}]
		});
		
		mainService.registerModule({
			
			displayName:	'Tax',
			homeUrl:		'#/tax-years',
			views:			[{displayName: 'Vehicles', homeUrl: '#/vehicles'},		
			      			 {displayName: 'Journeys', homeUrl: '#/journeys'}]
		});
		
		mainService.registerModule({
			
			displayName:	'App Data',
			homeUrl:		'#/app-data',
			views:			[{displayName: 'Comapnies', homeUrl: '#/comapnies'},
			      			 {displayName: 'Locations', homeUrl: '#/locations'},
			      			 {displayName: 'Journeys', homeUrl: '#/journeys'}]
		});
	}*/
);

mainModule.controller('mainController',
		
	function($scope, mainService) {
	
		var NAVBAR_ACTIVE_CLASS_NAME = "active";
		var NAVPILL_ACTIVE_CLASS_NAME = "active";
		
		$scope.modules = mainService.getModules();
		$scope.activeModule = mainService.getDefaultModule(); // Start off with default module.
		$scope.activeModuleViews = mainService.getModuleViews($scope.activeModule);

		$scope.selectActiveNavBarItem = function(indexToSetActive, actualIndex) {
			return indexToSetActive == actualIndex ? NAVBAR_ACTIVE_CLASS_NAME : null;
		};
		
		$scope.selectActiveNavPillItem = function(indexToSetActive, actualIndex) {
			return indexToSetActive == actualIndex ? NAVPILL_ACTIVE_CLASS_NAME : null;
		};
	}
);

mainModule.factory('mainService',
		
	function(defaultModule) {
	
		var modules = [];
		var mainFactory = {};
		
		mainFactory.registerModule = function(module) {
			
			modules.push({displayName: module.displayName,
						  homeUrl: module.homeUrl,
						  views: module.views});
			
		};
		
		mainFactory.getDefaultModule = function() {
			
			return defaultModule;
		};
		
		mainFactory.getModules = function() {
			
			return modules;
		};
		
		mainFactory.getModuleViews = function(activeModule) {
			
			return modules[activeModule].views;
		};
		
		return mainFactory;
	
	}
);

mainModule.directive('myList', function() {
	  
	return {
	    restrict: 'E',
	    scope: {
	      rows: "=",
	      deleteRow: "&onDelete"
	    },
	    template: function(tElm, tAttrs) {

	      var td = "", th = "";

	      angular.forEach(tElm.find('column'), function(column){
	        th = th + "<th>" + column.title + "</th>";
	        td = td + "<td>" + column.innerHTML + "</td>";
	      });

	      var template = '<table class="table table-striped table-hover">' + 
	                      '<thead>' + th + '</thead>' +
	                      '<tbody>' +
	                        '<tr ng-repeat="row in rows">'+ td +'</tr>' +
	                      '</tbody>' +
	                    '</table>';
	      
	      return template;
	    }
	  };
	});