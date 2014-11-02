
var contractModule = angular.module('contract', ['main',
                                                 'data',
                                                 'messaging',
                                                 'view',
                                                 'ui',
                                                 'ngRoute']);

contractModule.run(
		
		 function(mainService, contractService) {
			
			 var MODULE_DISPLAY_NAME = 'Contracts';
			 var MODULE_HOME_URL = '#/contracts/page/1';

			 var OPTION_DISPLAY_NAME_CONTRACTS = 'Contracts';
			 var OPTION_HOME_URL_CONTRACTS = '#/contracts/page/1';
			 
			 var OPTION_DISPLAY_NAME_ADD_NEW_CONTRACT = 'New Contract';
			 var OPTION_URL_ADD_NEW_CONTRACT = '/contracts/0';
			 
			 
			 mainService.registerModule({
				 
				 displayName:	MODULE_DISPLAY_NAME,
				 homeUrl:		MODULE_HOME_URL,
				 views:			[{displayName: OPTION_DISPLAY_NAME_CONTRACTS, homeUrl: OPTION_HOME_URL_CONTRACTS}]
			 });
			 
			 contractService.setOptionsOnListView([
					
				 {displayLabel: OPTION_DISPLAY_NAME_ADD_NEW_CONTRACT, url: OPTION_URL_ADD_NEW_CONTRACT, isDisabled: false},
				 {displayLabel: 'Test', url: OPTION_URL_ADD_NEW_CONTRACT, isDisabled: false},
				 {displayLabel: 'Another Test', url: OPTION_URL_ADD_NEW_CONTRACT, isDisabled: false}
			]);
		}
	);

contractModule.config(
		
	['$routeProvider',
		
	function($routeProvider) {
		
		$routeProvider
		
			.when('/contracts/page/:page',
					
				{controller:  'contractListController',
				 templateUrl: 'static/app-partials/contract-list-view.html'}
			)
			
			.when('/contracts/:contractId',
					
				{controller:  'contractDetailController',
				 templateUrl: 'static/app-partials/contract-detail-view.html'}
			)
			
			.otherwise({redirectTo:'/contracts/page/1'});
	}]
);

// CONTRACT
// --------

// contractService factory
contractModule.factory('contractService',
	 
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
contractModule.controller('contractListController',
		
	function($scope, contractService, uiService, viewService) {
	
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
contractModule.controller('contractDetailController',
		
	function($scope, $routeParams, contractService, viewService) {
		
		$scope.contractId = $routeParams.contractId;
		$scope.isCollapsed = true;
		// $scope.contractActivityTypeList = contractActivityTypeService.getAll();
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
		
		/*$scope.addContractActivityLogItem = function(activityLogItem) {
			$scope.contract.contractActivityLogItems.push({});
		};
		
		$scope.removeContractActivityLogItem = function(activityLogItemIndex) {
			
			$scope.contract.contractActivityLogItems.splice(activityLogItemIndex, 1);
		};*/
	}
);