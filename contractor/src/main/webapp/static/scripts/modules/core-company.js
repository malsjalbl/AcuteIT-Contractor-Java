
var coreModule = angular.module('core-company', ['ngResource', 'core-data']);
 
coreModule.run(
		
		 function(contractService, contractStatusService) {
			
			contractService.setAvailableActions([
				
			    {displayLabel: 'New Contract', partialUrl: '/contracts/0', isDisabled: false},
			    {displayLabel: 'Contract Status List', partialUrl: '/contract_status', isDisabled: false}
			]);
			
			contractStatusService.setAvailableActions([
			                             				
 			    {displayLabel: 'nnnContract Status', partialUrl: '/contract_status/0', isDisabled: false}
 			]);
		}
	);

coreModule.config(
		
	['$routeProvider',
		
	function($routeProvider) {
		
		$routeProvider
		
			.when('/contracts',
					
				{controller: 'contractListController',
				 templateUrl: 'static/partials/contract-list-view.html'}
			)
			
			.when('/contracts/:contractId',
					
				{controller: 'contractDetailController',
				 templateUrl: 'static/partials/contract-detail-view.html'}
			)
			
			.when('/contract_status',
					
				{controller: 'contractStatusListController',
				 templateUrl: 'static/partials/contract-status-list-view.html'}
			)
			
			.when('/contract_status/:contractStatusId',
					
				{controller: 'contractStatusDetailController',
				 templateUrl: 'static/partials/contract-status-detail-view.html'}
			)
			
			.otherwise({redirectTo:'/contracts'});
	}]
);

// CONTRACT
// --------

// contractService factory
coreModule.factory('contractService',
	 
	function($resource, $location, $window, $route, dataService, appService, uiService) {
	
		var FRIENDLY_CONTRACT_CLASS_NAME = 'Contract';
		var CONTRACT_RESOURCE_URL = '/mileage/contracts/:id';
		var RESOURCE_ID_SYMBOL = '@id';

		var contractFactory = {};
		
		var ContractEntityResource = dataService.getEntityResource(CONTRACT_RESOURCE_URL, {id: RESOURCE_ID_SYMBOL});
		
		ContractEntityResource.prototype.toString = function contractToString() {
			return this.symbol;
		};
		
		ContractEntityResource.prototype.friendlyEntityName = function contractFriendlyEntityName() {
			return FRIENDLY_CONTRACT_CLASS_NAME;
		};
	
		ContractEntityResource.prototype.friendlyClassName = FRIENDLY_CONTRACT_CLASS_NAME;
		
		contractFactory.getAll = function() {
        	return dataService.getAllEntities(ContractEntityResource);
        };
        
        contractFactory.getById = function(id) {
    		return dataService.getEntityById(ContractEntityResource, id);
        };
        
        contractFactory.getNew = function() {
        	 return dataService.getNewEntity(ContractEntityResource);
        };
        
        contractFactory.saveContract = function(contract) {
			
			dataService.saveEntity(contract,
					
				function() {
    			
					// CRUD Save success
					appService.addAlert({type: "success", msg: contract.friendlyEntityName() + " [" + contract + "] saved successfully."});
					appService.reloadCurrentView();
				},
				
				function() {
					
					// CRUD Save failure
					appService.addAlert({type: "error", msg: "An error occurred attempting to save " + contract.friendlyEntityName() + " [" +  contract + "]."});
					appService.reloadCurrentView();
				}
			);
		};
		
		contractFactory.deleteContract = function(contract) {
			
			dataService.deleteEntityById(contract,
				
        		function() {

					// CRUD success
					appService.addAlert({type: 'success', msg: contract.friendlyEntityName() + ' [' +  contract + '] deleted successfully.'});
					appService.reloadCurrentView();
				},
				
				function() {
					
					// CRUD failure
					appFactory.addAlert({type: 'error', msg: 'An error ocurred attempting to delete ' + friendlyEntityName() + '[' +  contract + "]."});
					appFactory.reloadCurrentView();
				}
			);
		};
		
		contractFactory.setAvailableActions = function(availableActions) {
			
			this.availableActions = availableActions;
		};
		
		contractFactory.getAvailableActions = function() {
			
			return this.availableActions;
		};
		
		return contractFactory;
	}
);

//contractStatusService factory
coreModule.factory('contractStatusService',
	 
	function($resource, $location, $window, $route, dataService, appService, uiService) {  
	
		var FRIENDLY_CONTRACT_STATUS_CLASS_NAME = 'Contract Status';
		var CONTRACT_STATUS_RESOURCE_URL = '/mileage/contract_status/:id';
		var RESOURCE_ID_SYMBOL = '@id';
		
		var contractStatusFactory = {};
		var ContractStatusEntityResource = dataService.getEntityResource(CONTRACT_STATUS_RESOURCE_URL, {id: RESOURCE_ID_SYMBOL});
		
		ContractStatusEntityResource.prototype.toString = function contractStatusToString() {
			  return this.symbol;
		};
		
		ContractStatusEntityResource.prototype.friendlyEntityName = function contractStatusFriendlyEntityName() {
			return FRIENDLY_CONTRACT_STATUS_CLASS_NAME;
		};
		
		contractStatusFactory.getAll = function() {
        	return dataService.getAllEntities(ContractStatusEntityResource);
        };
        
        contractStatusFactory.getById = function(id) {
    		return dataService.getEntityById(ContractStatusEntityResource, id);
        };
        
        contractStatusFactory.getNew = function() {
       	 return dataService.getNewEntity(ContractStatusEntityResource);
       };
    
       contractStatusFactory.saveContractStatus = function(contractStatus) {
			
			dataService.saveEntity(contractStatus,
					
				function() {
   			
					// CRUD Save success
					appService.addAlert({type: "success", msg: contractStatus.friendlyEntityName() + " [" + contractStatus + "] saved successfully."});
					appService.reloadCurrentView();
				},
				
				function() {
					
					// CRUD Save failure
					appService.addAlert({type: "error", msg: "An error occurred attempting to save " + contractStatus.friendlyEntityName + " [" +  contractStatus + "]."});
					appService.reloadCurrentView();
				}
			);
		};
		
		contractStatusFactory.deleteContractStatus = function(contractStatus) {
			
			dataService.deleteEntityById(contractStatus,
				
        		function() {

					// CRUD success
					appService.addAlert({type: 'success', msg: contractStatus.friendlyEntityName() + ' [' +  contractStatus + '] deleted successfully.'});
					appService.reloadCurrentView();
				},
				
				function() {
					
					// CRUD failure
					appFactory.addAlert({type: 'error', msg: 'An error ocurred attempting to delete ' + contractStatus.friendlyEntityName() + '[' +  contractStatus + "]."});
					appFactory.reloadCurrentView();
				}
			);
		};
		
		contractStatusFactory.setAvailableActions = function(availableActions) {
			this.availableActions = availableActions;
		};
		
		contractStatusFactory.getAvailableActions = function() {
			return this.availableActions;
		};
		
		return contractStatusFactory;
	}
);

// contractListController
coreModule.controller('contractListController',
		
	function($scope, contractService, appService, uiService) {
	
		$scope.contracts = contractService.getAll();
		$scope.availableActions = contractService.getAvailableActions();
		$scope.defaultContractAction = $scope.availableActions[0];
		
		$scope.deleteContractWithConfirmation = function(contract) {
			
			var popupTitle = UI_CRUD_DELETE_SYMBOL + ' ' + contractService.getFriendlyEntityName() + " '" + contract + "'?";
			var popupMessage = 'Are you sure you want to delete this ' + contractService.getFriendlyEntityName() + '?';
			
			var confirmDeleteCallback = function() {
				alert('Confirm');
				contractService.deleteContract(contract);
			};
			
			var cancelDeleteCallback = function() {
				alert('Cancel');
				//contractService.deleteById(contract);
			};
			
			uiService.popupConfirm(popupTitle, popupMessage, confirmDeleteCallback, cancelDeleteCallback);
		};
	}
);

// contractDetailController
coreModule.controller('contractDetailController',
		
	function($scope, $routeParams, contractService, contractStatusService, appService) {
		
		$scope.contractId = $routeParams.contractId;
		$scope.isCollapsed = true;
		$scope.contractStatusList = contractStatusService.getAll();
		$scope.contractTermLineItem = {};
		
		if ($scope.contractId != 0) {
			$scope.contract = contractService.getById($scope.contractId);
		} else {
			$scope.contract = contractService.getNew();
			$scope.contract.contractTermLineItems = [];
		}

		$scope.open = function() {
			$scope.opened = true;
		 };
		
		$scope.addContractTermLineItem = function(contractTermLineItem) {
			$scope.contract.contractTermLineItems.push({});
		};
		
		$scope.saveContract = function() {
			contractService.saveContract($scope.contract);
		};
		
		$scope.del = function() {
			contractService.del($scope.contract);
		};
		
		$scope.cancelAndReturnToContractList = function() {
			
			$scope.contract = null;
			appService.displayView('/contracts');
		};
		
		$scope.removeLineItem = function(lineItemIndex) {
			
			$scope.contract.contractTermLineItems.splice(lineItemIndex, 1);
			
		};
	}
);

//contractStatusListController
coreModule.controller('contractStatusListController',
		
	function($scope, contractStatusService, uiService) {
	
		$scope.contractStatusList = contractStatusService.getAll();
		$scope.availableActions = contractStatusService.getAvailableActions();
		$scope.defaultAction = $scope.availableActions[0];
		
		$scope.deleteContractStatusWithConfirmation = function(contractStatus) {
			
			var popupTitle = UI_CRUD_DELETE_SYMBOL + ' ' + contractStatus.friendlyEntityName() + " '" + contractStatus + "'?";
			var popupMessage = 'Are you sure you want to delete this ' + contractStatus.friendlyEntityName() + '?';
			
			var confirmDeleteCallback = function() {
				alert('Confirm');
				contractStatusService.deleteContractStatus(contractStatus);
			};
			
			var cancelDeleteCallback = function() {
				alert('Cancel');
			};
			
			uiService.popupConfirm(popupTitle, popupMessage, confirmDeleteCallback, cancelDeleteCallback);
		};
	}
);

//contractStatusDetailController
coreModule.controller('contractStatusDetailController',
		
	function($scope, $routeParams, contractStatusService, appService) {
		
		$scope.contractStatusId = $routeParams.contractStatusId;
		
		if ($scope.contractStatusId != 0) {
			$scope.contractStatus = contractStatusService.getById($scope.contractStatusId);
		} else {
			$scope.contractStatus = contractStatusService.getNew();;
		}

		$scope.saveContractStatus = function() {
			contractStatusService.saveContractStatus($scope.contractStatus);
		};
		
		$scope.del = function() {
			contractStatusService.del($scope.contractStatus);
		};
		
		$scope.cancelAndReturnToContractStatusList = function() {
			
			$scope.contractStatus = null;
			appService.displayView('/contract_status');
		};
	}
);

//LOCATION
//--------

//locationService factory
coreModule.factory('locationService',
	 
	function($resource) {  
	
		var Location = $resource('/mileage/location/:id', {id: '@id'});
		var locations = null;
		
		var locationFactory = {};
	    	
		locationFactory.getAll =
			
	        function() {
	        	if(!locations) {
	        		locations = Location.query();
	        	}
	            return locations;
	        };
	    
	    locationFactory.saveOne =
	    	
			function(location) {
				var savedLocation = Location.save(location);
				locations.push({"id": savedLocation.id,
								"symbol": savedLocation.symbol,
								"description": savedLocation.description});
				
				return savedLocation;
			};
		
		locationFactory.setActionMenu = 
			
			function(actionMenu) {
			
				this.actionMenu = actionMenu;
		};
		
		locationFactory.getActionMenu = 
			
			function() {
			
				return this.actionMenu;
		};
		
		return locationFactory;
	}
); 

//locationController
coreModule.controller('locationController',
		
	function($scope, $location, locationService) {
	
		$scope.locations = locationService.getAll();
		$scope.actionMenu = locationService.getActionMenu();
		
		$scope.location = {"id": 0, "symbol": "", "description": ""};
		
		$scope.saveLocation = function() {
			locationService.saveOne($scope.location);
		};
		
		$scope.updateMenuPartial = function() {
			
			var partialLocation = $scope.selectedActionPartial;
			$location.path(partialLocation);
		};
	}
);

//contractService factory
/*coreModule.factory('contractService',
	 
	function($resource, $location, $window, $route) {  
	
		var ContractEntityResource = $resource('/mileage/contracts/:id', {id: '@id'});
		var actionMenu = [];
		
		var contractFactory = {};
	    	
		contractFactory.getAll = function() {
			
        	return ContractEntityResource.query();
        };
        
        contractFactory.getContractById = function(id) {
        	
        		return ContractEntityResource.get({id: id});
        };
        
        contractFactory.delete = function(contract, successCallBack, failureCallBack) {
    		
        	contract.$delete({id: contract.id},	function() {successCallBack();}, function() {failureCallBack();});
        };
        
        contractFactory.getNewContract = function() {
        	
        		return new ContractEntityResource({id: 0});
        };
    
	    contractFactory.save = function(contract) {
	    	
	    	contract.$save({}, function(){successCallBack(u, putResponseHeaders);}, function(){failureCallBack();});
		};
		
		contractFactory.setActionMenu = function(actionMenu) {
			
				this.actionMenu = actionMenu;
		};
		
		contractFactory.getActionMenu = function() {
			
				return this.actionMenu;
		};
		
		contractFactory.displayView = function(view) {
			
			$location.path(view);
		};
		
		contractFactory.reloadView = function() {
			
			$route.reload();
		};
		
		return contractFactory;
	}
);*/
