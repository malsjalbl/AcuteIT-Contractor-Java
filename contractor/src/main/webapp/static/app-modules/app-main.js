var app = angular.module('app-main', []);

app.value('defaultModule', 0);

app.run(
		
	/* function(appService) {
		
		appService.registerModule({
			
			displayName:	'Mileage',
			homeUrl:		'#/mileages',
			views:			[{displayName: 'Vehicle List', homeUrl: '#/vehicles'},		
			      			 {displayName: 'Journey List', homeUrl: '#/journeys'}]
		});
		
		appService.registerModule({
			
			displayName:	'Tax',
			homeUrl:		'#/tax-years',
			views:			[{displayName: 'Vehicles', homeUrl: '#/vehicles'},		
			      			 {displayName: 'Journeys', homeUrl: '#/journeys'}]
		});
		
		appService.registerModule({
			
			displayName:	'App Data',
			homeUrl:		'#/app-data',
			views:			[{displayName: 'Comapnies', homeUrl: '#/comapnies'},
			      			 {displayName: 'Locations', homeUrl: '#/locations'},
			      			 {displayName: 'Journeys', homeUrl: '#/journeys'}]
		});
	}*/
);

app.controller('appController',
		
	function($scope, appService) {
	
		var NAVBAR_ACTIVE_CLASS_NAME = "active";
		var NAVPILL_ACTIVE_CLASS_NAME = "active";
		
		$scope.modules = appService.getModules();
		$scope.activeModule = appService.getDefaultModule(); // Start off with default module.
		$scope.activeModuleViews = appService.getModuleViews($scope.activeModule);

		$scope.selectActiveNavBarItem = function(indexToSetActive, actualIndex) {
			return indexToSetActive == actualIndex ? NAVBAR_ACTIVE_CLASS_NAME : null;
		};
		
		$scope.selectActiveNavPillItem = function(indexToSetActive, actualIndex) {
			return indexToSetActive == actualIndex ? NAVPILL_ACTIVE_CLASS_NAME : null;
		};
	}
);

app.factory('appService',
		
	function(defaultModule) {
	
		var modules = [];
		var appFactory = {};
		
		appFactory.registerModule = function(module) {
			
			modules.push({displayName: module.displayName,
						  homeUrl: module.homeUrl,
						  views: module.views});
			
		};
		
		appFactory.getDefaultModule = function() {
			
			return defaultModule;
		};
		
		appFactory.getModules = function() {
			
			return modules;
		};
		
		appFactory.getModuleViews = function(activeModule) {
			
			alert(modules);
			return modules[activeModule].views;
		};
		
		return appFactory;
	
	}
);

app.directive('aitList', function() {
	  
	return {
	    restrict: 'E',
	    //replace:true,
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