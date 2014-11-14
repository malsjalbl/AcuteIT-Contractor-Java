
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
				templateUrl: 'static/app/common/dialog/dialog-confirm.html',
				controller: 'ConfirmDialogCtrl',
				backdrop: 'static',
				resolve: {
							title: function () {
								return angular.copy(title);
							},
					
							content: function () {
								return angular.copy(content);
							}
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
		  
		 $scope.cancel = function () {
			 $modalInstance.dismiss('no');
		 };
		  
		 $scope.close = function () {
			 $modalInstance.close('yes');
		 };
	}
);


