
var dialogModule = angular.module('dialog', ['ui.bootstrap']);

dialogModule.run(function($templateCache, $http) {
	$http.get('static/app/common/dialog/dialog-confirm.html', {cache:$templateCache});
	$http.get('static/app/common/dialog/dialog-error.html', {cache:$templateCache});
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


