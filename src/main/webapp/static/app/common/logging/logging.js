
var logModule = angular.module('log', ['main',
                                          'dbLogger',]);

logModule.run(
		
		 function(mainService, logService) {
				
			 var MODULE_DISPLAY_NAME = 'Activity Log';
			 var MODULE_HOME_URL = '#/activity_logs/page/1';
			 
			 mainService.registerModule({
				 
				 displayName:	MODULE_DISPLAY_NAME,
				 homeUrl:		MODULE_HOME_URL,
				 views:			[{displayName: OPTION_DISPLAY_NAME_CONTRACTS, homeUrl: OPTION_HOME_URL_CONTRACTS}]
			 });
			 
			 var OPTION_DISPLAY_NAME_CONTRACTS = 'Activity Logs';
			 var OPTION_HOME_URL_CONTRACTS = '#/contracts/page/1';
			 
			 var OPTION_DISPLAY_NAME_ADD_NEW_CONTRACT = 'Activity Types';
			 var OPTION_URL_ADD_NEW_CONTRACT = '/activity_log_types/page/1';
			 
			 ActivityLogService.setOptionsOnListView([
					
				 {displayLabel: OPTION_DISPLAY_NAME_ADD_NEW_CONTRACT, url: OPTION_URL_ADD_NEW_CONTRACT, isDisabled: false},
				 {displayLabel: 'Test', url: OPTION_URL_ADD_NEW_CONTRACT, isDisabled: false},
				 {displayLabel: 'Another Test', url: OPTION_URL_ADD_NEW_CONTRACT, isDisabled: false}
			]);
	}
);

logModule.config(
		
	['$routeProvider',
		
	function($routeProvider) {
		
		$routeProvider
		
			.when('/contracts/page/:page',
					
				{controller:  'contractListController',
				 templateUrl: 'static/partials/contract-list-view-test.html'}
			)
			
			.when('/contracts/:contractId',
					
				{controller:  'contractDetailController',
				 templateUrl: 'static/partials/contract-detail-view.html'}
			)
			
			.when('/contract-activity-types/page/:page',
					
				{controller:  'contractActivityTypeListController',
				 templateUrl: 'static/partials/contract-activity-type-list-view.html'}
			)
			
			.when('/contract-activity-type/:contractActivityTypeId',
					
				{controller: 'contractActivityTypeDetailController',
				 templateUrl: 'static/partials/contract-activity-type-detail-view.html'}
			)
			
			.otherwise({redirectTo:'/contracts/page/1'});
	}]
);

// CONTRACT
// --------

// contractService factory
logModule.factory('contractService',
	 
	function(dataService, viewService, messagingService) {
	
		var CLASS_NAME = 'Contract';
		var optionsOnListView = [];
		
		var EntityResource = dataService.getEntityResource(
				
				'/contractor/contracts/:id',
				 {id:'@id'},
				 {getPage: {method:'GET', url: '/contractor/contracts/page/:page', isArray: false}}
		);
		
		var factory = {};
		
		EntityResource.prototype.toString = function contractToString() {
			return this.symbol;
		};
		
		EntityResource.prototype.className = function contractClassEntityName() {
			return CLASS_NAME;
		};                    		
		
		factory.getAll = function() {
        	return dataService.getAllEntities(EntityResource);
        };
        
        factory.getPage = function(page) {
        	return dataService.getPage(EntityResource, page);
        };
        
        factory.getById = function(id) {
    		return dataService.getEntityById(EntityResource, id);
        };
        
        factory.getNew = function() {
        	 return dataService.getNewEntity(EntityResource);
        };
        
        factory.getOptionsOnListView = function() {
        	 return optionsOnListView;
        };
        
        factory.setOptionsOnListView = function(options) {
       	 	optionsOnListView = options;
       };
        
        factory.save = function(contract) {
			
			dataService.saveEntity(contract,
					
				function() {
    			
					// CRUD Save success
					messagingService.setGenericCrudSaveSuccessMessage(contract);
					viewService.reloadCurrentView();
				},
				
				function() {
					
					// CRUD Save failure
					messagingService.setGenericCrudSaveFailMessage(contract);
					viewService.reloadCurrentView();
				}
			);
		};
		
		factory.del = function(contract) {
			
			dataService.deleteEntityById(contract,
				
        		function() {

					// CRUD success
					messagingService.setGenericCrudDeleteSuccessMessage(contract);
					viewService.reloadCurrentView();
				},
				
				function() {
					
					// CRUD failure
					messagingService.setGenericCrudDeleteFailMessage(contract);
					viewService.reloadCurrentView();
				}
			);
		};

		return factory;
	}
);

// contractListController
logModule.controller('contractListController',
		
	function($scope, $sanitize, $sce, contractService, uiService, viewService) {
	
		var INITIAL_PAGE = 1;
		
		$scope.optionsOnListView = contractService.getOptionsOnListView();
		$scope.defaultContractAction = $scope.optionsOnListView[0];
		
		$scope.currentPageNumber = INITIAL_PAGE;
		$scope.totalItems = 7;
		$scope.itemsPerPage = 5;
		
		$scope.currentPage = contractService.getPage($scope.currentPageNumber);

		$scope.listOptions = {page: $scope.currentPage,
							  rowsPerPage: [10, 25, 50]};
		
		$scope.pageChanged = function() {
		    console.log('Page changed to: ' + $scope.currentPage.number);
		  };

		$scope.deleteContract = function(contract) {
			
			var confirmDeleteCallback = function() {
				contractService.del(contract);
			};
			
			var confirmCancelCallback = function() {
				alert('Cancelling deletion...');
			};
			
			uiService.genericCrudDeleteConfirm(contract, confirmDeleteCallback, confirmCancelCallback);
		};
	}
);

// contractDetailController
logModule.controller('contractDetailController',
		
	function($scope, $routeParams, contractService, contractActivityTypeService, viewService) {
		
		$scope.contractId = $routeParams.contractId;
		$scope.isCollapsed = true;
		$scope.contractActivityTypeList = contractActivityTypeService.getAll();
		$scope.activityLogItems = {};
		
		if ($scope.contractId != 0) {
			$scope.contract = contractService.getById($scope.contractId);
			//$scope.contract.startDate = new Date($scope.contract.startDate);
		} else {
			$scope.contract = contractService.getNew();
			$scope.contract.contractActivityLogItems = [];
		}

		$scope.open = function() {
			$scope.opened = true;
		 };
		
		$scope.saveContract = function() {
			contractService.save($scope.contract);
		};
		
/*		$scope.delete = function() {
			contractService.del($scope.contract);
		};*/
		
		$scope.cancelAndReturnToContractList = function() {
			
			$scope.contract = null;
			viewService.setViewUrl('/contracts/page/1');
		};
		
		// Sub Records for activity log.
		// -----------------------------
		
		$scope.addContractActivityLogItem = function(activityLogItem) {
			$scope.contract.contractActivityLogItems.push({});
		};
		
		$scope.removeContractActivityLogItem = function(activityLogItemIndex) {
			
			$scope.contract.contractActivityLogItems.splice(activityLogItemIndex, 1);
		};
	}
);

//contractActivityTypeService factory
logModule.factory('contractActivityTypeService',
	 
	function($resource, $location, $window, $route, dataService, uiService) {  
	
	var CLASS_NAME = 'Contract Activity Type';
	var optionsOnlistView = [];
	var EntityResource = $resource('/contractor/contract_activity_types/:id', {id:'@id'},
			
							{getPage: {method:'GET',
							 url: '/contractor/contract-activity-types/page/:page',
							 isArray: false}
	});

	var contractActivityTypeFactory = {};
	
	EntityResource.prototype.toString = function contractActivityTypeToString() {
		return this.symbol;
	};
	
	EntityResource.prototype.className = function contractActivityTypeClassEntityName() {
		return CLASS_NAME;
	};                    		
	
	contractActivityTypeFactory.getAll = function() {
    	return dataService.getAllEntities(EntityResource);
    };
    
    contractActivityTypeFactory.getPage = function(page) {
    	return dataService.getPage(EntityResource, page);
    };
    
    contractActivityTypeFactory.getById = function(id) {
		return dataService.getEntityById(EntityResource, id);
    };
    
    contractActivityTypeFactory.getNew = function() {
    	 return dataService.getNewEntity(EntityResource);
    };
    
    contractActivityTypeFactory.getOptionsOnListView = function() {
    	 return optionsOnListView;
    };
    
    contractActivityTypeFactory.setOptionsOnListView = function(options) {
   	 	optionsOnListView = options;
   };
    
   contractActivityTypeFactory.save = function(contractActivityType) {
		
		dataService.saveEntity(contractActivityType,
				
			function() {
			
				// CRUD Save success
				messagingService.setGenericCrudSaveSuccessMessage(contractActivityType);
				viewService.reloadCurrentView();
			},
			
			function() {
				
				// CRUD Save failure
				messagingService.setGenericCrudSaveFailMessage(contractActivityType);
				viewService.reloadCurrentView();
			}
		);
	};
	
	contractActivityTypeFactory.del = function(contractActivityType) {
		
		dataService.deleteEntityById(contractActivityType,
			
   		function() {

				// CRUD success
				messagingService.setGenericCrudDeleteSuccessMessage(contractActivityType);
				viewService.reloadCurrentView();
			},
			
			function() {
				
				// CRUD failure
				messagingService.setGenericCrudDeleteFailMessage(contractActivityType);
				viewService.reloadCurrentView();
			}
		);
	};
	
		return contractActivityTypeFactory;
	}
);

//contractStatusListController
logModule.controller('contractStatusListController',
		
	function($scope, contractActivityTypeService, uiService) {
	
		$scope.contractStatusList = contractActivityTypeService.getAll();
		$scope.availableActions = contractActivityTypeService.getAvailableActions();
		$scope.defaultAction = $scope.availableActions[0];
		
		$scope.deleteContractStatusWithConfirmation = function(contractStatus) {
			
			var popupTitle = UI_CRUD_DELETE_SYMBOL + ' ' + contractStatus.friendlyEntityName() + " '" + contractStatus + "'?";
			var popupMessage = 'Are you sure you want to delete this ' + contractStatus.friendlyEntityName() + '?';
			
			var confirmDeleteCallback = function() {
				alert('Confirm');
				contractActivityTypeService.deleteContractStatus(contractStatus);
			};
			
			var cancelDeleteCallback = function() {
				alert('Cancel');
			};
			
			uiService.popupConfirm(popupTitle, popupMessage, confirmDeleteCallback, cancelDeleteCallback);
		};
	}
);

//contractStatusDetailController
logModule.controller('contractStatusDetailController',
		
	function($scope, $routeParams, contractActivityTypeService) {
		
		$scope.contractStatusId = $routeParams.contractStatusId;
		
		if ($scope.contractStatusId != 0) {
			$scope.contractStatus = contractActivityTypeService.getById($scope.contractStatusId);
		} else {
			$scope.contractStatus = contractActivityTypeService.getNew();;
		}

		$scope.saveContractStatus = function() {
			contractActivityTypeService.saveContractStatus($scope.contractStatus);
		};
		
		$scope.del = function() {
			contractActivityTypeService.del($scope.contractStatus);
		};
		
		$scope.cancelAndReturnToContractStatusList = function() {
			
			$scope.contractStatus = null;
			appService.displayView('/contract_status');
		};
	}
);