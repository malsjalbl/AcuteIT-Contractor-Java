
var dialogModule = angular.module('dialog', ['ui.bootstrap']);
 
dialogModule.factory('dialogService',
	 
	function($modal) {
	
		var UI_BUTTON_PRESSED__YES = 0;
		var UI_BUTTON_PRESSED__CANCEL = 1;
		var UI_BUTTON_LABEL__YES = 'Yes';
		var UI_BUTTON_LABEL__CANCEL = 'Cancel';
		var UI_BUTTON_CSS__YES = 'btn-success';
		var UI_BUTTON_CSS__CANCEL = 'btn-danger';
		var UI_CRUD_DELETE__TITLE_TEXT = 'Delete';
		var UI_CRUD_DELETE__LAST_CHANCE_MESSAGE_TEXT = 'Are you sure you want to delete this';
	
		var dialogFactory = {};
		
		dialogFactory.confirm = function(title, content) {
			
			return $modal.open({
				templateUrl: 'static/dialog/dialog-confirm.html',
				controller: 'ConfirmDialogCtrl',
				//backdrop: 'static',
				resolve: {
					title: function () {
						return angular.copy(title);
					},
					
					content: function () {
						return angular.copy(content);
					}
				}
			}); // end modal.open
		};
	    	
		dialogFactory.genericCrudDeleteConfirm = function(entity, executeConfirmedCallback, executeCancelledCallback) {

			var popupTitle   = UI_CRUD_DELETE__TITLE_TEXT + ' ' + entity.className + " '" + entity + "'?";
			var popupMessage = UI_CRUD_DELETE__LAST_CHANCE_MESSAGE_TEXT + ' ' + entity.className + '?';
			
			var popupButtons = [{label: UI_BUTTON_LABEL__YES,    result: UI_BUTTON_PRESSED__YES,    cssClass: UI_BUTTON_CSS__YES},
			                    {label: UI_BUTTON_LABEL__CANCEL, result: UI_BUTTON_PRESSED__CANCEL, cssClass: UI_BUTTON_CSS__CANCEL}];
			
			//var popupConfirm = $modal({CRUD_DELETE, popupMessage, popupButtons});
			
			popupConfirm.open().then(function(result) {
				
	            if (result == UI_BUTTON_PRESSED__YES) {
	            	executeConfirmedCallback();
	            }
	            else {
	            	executeCancelledCallback();
	            }
	        });
		};
		
		return dialogFactory;
	}
); 

dialogModule.controller('ConfirmDialogCtrl',
		
	function($scope, $modalInstance, title, content) {
	
	 $scope.title = (angular.isDefined(title)) ? title : 'Confirmation';
	 $scope.content = (angular.isDefined(content)) ? content : 'Confirmation required.';
	  
	 $scope.no = function () {
		 $modalInstance.dismiss('no');
	 };
	  
	 $scope.yes = function () {
		 $modalInstance.close('yes');
	 };
	}
);


