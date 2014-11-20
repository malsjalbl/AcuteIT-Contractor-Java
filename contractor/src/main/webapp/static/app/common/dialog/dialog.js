
var dialogModule = angular.module('dialog', ['ui.bootstrap']);

dialogModule.run(function($templateCache, $http) {
	$http.get('static/app/common/dialog/dialog-confirm.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/dialog-error.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/dialog-ajax-confirm.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/default_spinner.gif', {cache:$templateCache});
});

dialogModule.factory('dialogSpinnerService', function() {
	
	
});
		

 
dialogModule.factory('dialogService',
	 
	function($modal) {
	
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
		
		dialogFactory.error = function(title, content) {
			
			return $modal.open({
				templateUrl: 'static/app/common/dialog/dialog-error.html',
				controller: 'ErrorDialogCtrl',
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
		
		dialogFactory.ajaxConfirm = function(options) {
					
			return $modal.open({
				templateUrl: 'static/app/common/dialog/dialog-data-confirm.html',
				controller: 'DataConfirmDialogCtrl',
				backdrop: 'static',
				resolve: {
							options: function () {
								return options;
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
			 $modalInstance.dismiss();
		 };
		  
		 $scope.close = function () {
			 $modalInstance.close();
		 };
	}
);

dialogModule.controller('ErrorDialogCtrl',
		
	function($scope, $modalInstance, title, content) {

		$scope.title = (angular.isDefined(title)) ? title : 'Error';		 
		$scope.content = (angular.isDefined(content)) ? content : 'An undetermined error occured.';
		  
		 $scope.close = function () {
			 $modalInstance.close('yes');
		 };
	}
);

dialogModule.controller('AjaxConfirmDialogCtrl',
		
		function($scope, $modalInstance, options, modalSpinnerService) {
		
			 $scope.title = (angular.isDefined(options.title)) ? options.title : 'Confirmation';
			 $scope.content = (angular.isDefined(options.content)) ? options.content : 'Confirmation required.';
			 
			 $scope.dismissButton.label = 'Cancel';
			 $scope.dismissButton.isDisabled = false;
			 $scope.confirmButton.label = 'OK';
			 $scope.confirmButton.isDisabled = false;
			 
			 $scope.spinner = modalSpinnerService.getSpinner();
			 
			 $scope.confirm = function () {
				 
				 $scope.spinner.isVisible(true);
				 $scope.confirmButton.isDisabled = true;
				 $scope.dismissButton.isDisabled = true
				 
				 options.action(options.actionOn,
						 
			 		function() {
					 	// action successful
					 	$scope.spinner.isVisible(false);
						$scope.confirmButton.isDisabled = false;
						$scope.dismissButton.isVisible = false
				 	},
				 	
				 	function() {
				 		// action unsuccessful
				 		$scope.spinner.isVisible(false);
				 		$scope.confirmButton.isDisabled = false;
				 		$scope.confirmButton.label = 'Try Again...';
						$scope.dismissButton.isDisabled = false;
				 	}
				 );
			 };
			 
			 $scope.dismiss = function () {
				 $modalInstance.dismiss();
			 };
		}
	);


