
var dialogModule = angular.module('dialog', ['ui.bootstrap']);

dialogModule.run(function($templateCache, $http) {
	$http.get('static/app/common/dialog/dialog-confirm.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/dialog-error.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/dialog-ajax-confirm.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/default_spinner.gif', {cache:$templateCache});
});

dialogModule.factory('dialogSpinnerService', function() {
		
		var dialogSpinnerFactory = {};
		
		var spinner = {isVisible: false, src: 'static/app/common/spinner/ajax-loader.gif'};
		
		dialogSpinnerFactory.isVisible = function(state) {
			
			spinner.isVisible = state;
		};
		
		dialogSpinnerFactory.getSpinner = function() {
			
			return spinner;
		};
		
		return dialogSpinnerFactory;
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
				templateUrl: 'static/app/common/dialog/dialog-ajax-confirm.html',
				controller: 'AjaxConfirmDialogCtrl',
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
		
		function($scope, $modalInstance, options, dialogSpinnerService) {
		
			 $scope.title = (angular.isDefined(options.title)) ? options.title : 'Confirmation';
			 $scope.content = (angular.isDefined(options.content)) ? options.content : 'Confirmation required.';
			 
			 $scope.dismissButton = {};
			 $scope.confirmButton = {};
			 $scope.closeButton = {};
			 $scope.message = {};
			 
			 $scope.dismissButton.isVisible = true;
			 $scope.confirmButton.isVisible = true;
			 $scope.closeButton.isVisible = false;
			 $scope.message.isVisible = false;
			 
			 $scope.dismissButton.label = 'Cancel';
			 $scope.confirmButton.label = 'Yes';
			 $scope.closeButton.label = 'Close';
			 $scope.message.content = 'An error occured';
			 
			 $scope.dismissButton.isDisabled = false;
			 $scope.confirmButton.isDisabled = false;
			 $scope.closeButton.isDisabled = true;
			 
			 $scope.spinner = dialogSpinnerService.getSpinner();
			 
			 $scope.confirm = function () {
				 
				 $scope.spinner.isVisible = true;
				 $scope.content = "Attempting operation...";
				 $scope.confirmButton.isDisabled = true;
				 $scope.dismissButton.isDisabled = true;
				 $scope.message.isVisible = false;
				 
				 options.action(options.actionOn,
	
					function(value) {
				 		// action successful
					 	$scope.spinner.isVisible = false;
					 	$scope.content = "Operation completed successfully.";
					 	$scope.message.isVisible = true;
				 		$scope.message.content = value;
						$scope.confirmButton.isVisible = false;
						$scope.confirmButton.isDisabled = true;
						$scope.dismissButton.isVisible = false;
						$scope.dismissButton.isDisabled = true;
						$scope.closeButton.isDisabled = false;
						$scope.closeButton.isVisible = true;
				 	},
				 	
				 	function(responseHeaders) {
				 		// action unsuccessful
				 		$scope.spinner.isVisible = false;
				 		$scope.content = 'Operation failed.';
				 		$scope.message.isVisible = true;
				 		$scope.message.content = responseHeaders;
				 		$scope.confirmButton.isDisabled = false;
				 		$scope.confirmButton.label = 'Try Again...';
						$scope.dismissButton.isDisabled = false;
				 	}
				 );
			 };
			 
			 $scope.dismiss = function () {
				 $modalInstance.dismiss();
			 };
			 
			 $scope.close = function () {
				 $modalInstance.close();
			 };
		}
	);


