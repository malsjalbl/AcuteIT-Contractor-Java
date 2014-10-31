
var mileageModule = angular.module('mileage-vehicle', ['ngResource']);
 
mileageModule.run(
		
	 function(vehicleService) {
		
		 vehicleService.setAvailableActions([
			
		    {displayLabel: 'New Vehicle', partialUrl: '/vehicles/0', isDisabled: false}
		]);
	}
);

mileageModule.config(
		
	['$routeProvider',
		
	function($routeProvider) {
		
		$routeProvider
		
			.when('/vehicles',
					
				{controller: 'vehicleListController',
				 templateUrl: 'static/partials/vehicle-list-view.html'}
			)
			
			.when('/vehicles/:vehicleId',
					
				{controller: 'vehicleDetailController',
				 templateUrl: 'static/partials/vehicle-detail-view.html'}
			);
	}]
);

// VEHICLE
// -------

// vehicleService factory
mileageModule.factory('vehicleService',
	 
	function($resource, $location, $window, $route) {  
	
		var Vehicle = $resource('/mileage/vehicles/:id', {id: '@id'});
		
		Vehicle.prototype.toString = function vehicleToString() {
			  return this.symbol;
		};
		
		var availableActions = [];
		
		var vehicleFactory = {};
	    	
		vehicleFactory.getAll = function() {
			
        	return Vehicle.query();
        };
        
        vehicleFactory.getVehicleById = function(id) {
        	
        		return Vehicle.get({id: id});
        };
        
        vehicleFactory.deleteOne = function(vehicle, successCallBack, failureCallBack) {
    		
        	vehicle.$delete({id: vehicle.id},	function() {successCallBack();}, function() {failureCallBack();});
        };
        
        vehicleFactory.getBlankVehicle = function() {
        	
        		return new Vehicle({id: 0});
        };
    
	    vehicleFactory.saveOne = function(vehicle, successCallBack, failureCallBack) {
	    	
	    	vehicle.$save({id: vehicle.id}, function() {successCallBack();}, function() {failureCallBack();});
		};
		
		vehicleFactory.setAvailableActions = function(availableActions) {
			
			this.availableActions = availableActions;
		};
		
		vehicleFactory.getAvailableActions = function() {
			
			return this.availableActions;
		};
		
		vehicleFactory.getFriendlyEntityName = function() {
			
			return 'Vehicle';
		};
		
		return vehicleFactory;
	}
);

// VehicleListController
mileageModule.controller('vehicleListController',
		
	function($scope, vehicleService, appService) {
	
		$scope.vehicles = vehicleService.getAll();
		$scope.availableActions = vehicleService.getAvailableActions();
		$scope.defaultVehicleAction = $scope.availableActions[0];
		
		$scope.deleteVehicleWithConfirmation = function(vehicle) {
			appService.deleteEntityWithConfirmation(vehicle, vehicleService);
		};
	}
);

// VehicleDetailController
mileageModule.controller('vehicleDetailController',
		
	function($scope, $routeParams, vehicleService, appService) {
		
		$scope.vehicleId = $routeParams.vehicleId;
		
		if ($scope.vehicleId != 0) {
			$scope.vehicle = vehicleService.getVehicleById($scope.vehicleId);
		} else {
			$scope.vehicle = vehicleService.getBlankVehicle();
		}

		$scope.saveVehicle = function() {
			
			appService.saveEntity($scope.vehicle, vehicleService);
		};
		
		$scope.del = function() {
			vehicleService.del($scope.vehicle);
		};
		
		$scope.cancelAndReturnToVehicleList = function() {
			
			$scope.vehicle = null;
			appService.displayView('/vehicles');
		};
	}
);
