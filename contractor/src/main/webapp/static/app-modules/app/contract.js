
var contractModule = angular.module('contract', ['main',
                                                 'data',
                                                 'messaging',
                                                 'view',
                                                 'dialog',
                                                 'ngRoute']);

contractModule.run(
		
		 function(mainService, contractService) {
			
			 var MODULE_DISPLAY_NAME = 'Contracts';
			 var MODULE_HOME_URL = '#/contracts/page/1';
			 
			 mainService.registerModule({
				 
				 displayName:	MODULE_DISPLAY_NAME,
				 homeUrl:		MODULE_HOME_URL,
				 //views:			[{displayName: OPTION_DISPLAY_NAME_CONTRACTS, homeUrl: OPTION_HOME_URL_CONTRACTS}]
			 });
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
		var listViewOptions = [];
		
		var OPTION_CONTRACT_LIST_LABEL = 'Contract List';
		var OPTION_CONTRACT_LIST_URL = '#/contracts/page/1';
		
		var OPTION_NEW_CONTRACT_LABEL  = 'New Contract';
		var OPTION_NEW_CONTRACT_URL = '/contracts/0';
		
		listViewOptions.push(
		    
		    {displayLabel:  OPTION_NEW_CONTRACT_LABEL,
			 isActive: true,
			 action: function() {viewService.setUrl(OPTION_NEW_CONTRACT_URL);}
		    }
		);
		
		var EntityResource = dataService.getEntityResource(
				
				'/contractor/contracts/:id',
				 {id:'@id'},
				 {getPage: {method:'GET', url: '/contractor/contracts/page/:page', isArray: false}}
		);
		
		EntityResource.prototype.toString = function contractToString() {
			return this.symbol;
		};
		
		/*EntityResource.prototype.className = function contractClassEntityName() {
			return CLASS_NAME;
		};*/
		
		EntityResource.prototype.className = CLASS_NAME;
		
		var contractFactory = {};
		
		contractFactory.getAll = function() {
        	return dataService.getAllEntities(EntityResource);
        };
        
        contractFactory.getPage = function(page) {
        	return dataService.getPage(EntityResource, page);
        };
        
        contractFactory.getById = function(id) {
    		return dataService.getEntityById(EntityResource, id);
        };
        
        contractFactory.getNew = function() {
        	 return dataService.getNewEntity(EntityResource);
        };
        
        contractFactory.getListViewOptions = function() {
        	 return listViewOptions;
        };
        
        contractFactory.addListViewOptions = function(options) {
        	listViewOptions.push = options;
       };
        
       contractFactory.popupAreYouSure = function(scope, title, content) {
    	   
    	   uiService.popup(scope, title, content);
       };
       
       
       contractFactory.save = function(contract) {
			
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
		
		contractFactory.deleteContract = function() {
			dataService.deleteEntityById(contract);
		};
		
		contractFactory.del = function(contract) {
			
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

		return contractFactory;
	}
);

// contractListController
contractModule.controller('contractListController',
		
	function($scope, contractService, dialogService, viewService) {
	
		var INITIAL_PAGE = 1;
		
		$scope.listViewOptions = contractService.getListViewOptions();

		// $scope.optionsOnListView = contractService.getOptionsOnListView();
		$scope.defaultContractAction = $scope.listViewOptions[0];
		
		$scope.currentPageNumber = INITIAL_PAGE;
		$scope.totalItems = 7;
		$scope.itemsPerPage = 5;
		
		$scope.listViewActions
		$scope.currentPage = contractService.getPage($scope.currentPageNumber);

		$scope.listOptions = {page: $scope.currentPage,
							  rowsPerPage: [10, 25, 50]};
		
		$scope.pageChanged = function() {
		    console.log('Page changed to: ' + $scope.currentPage.number);
		  };

		/*$scope.deleteContract = function(contract) {
			
			var confirmDeleteCallback = function() {
				contractService.del(contract);
			};
			
			var confirmCancelCallback = function() {
				alert('Cancelling deletion...');
			};
			
			uiService.genericCrudDeleteConfirm(contract, confirmDeleteCallback, confirmCancelCallback);
		};*/
		  
		  $scope.popupAreYouSure = function(contract) {
			  
			  di = dialogService.confirm(' A Title', 'Are you sure?');
		  };
		  
		  $scope.deleteContract = function(contract) {
			  alert('hi');
			  contractService.del(contract);
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
