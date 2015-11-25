
var messagingModule = angular.module('messaging', []);
 
/*MESSAGING SERVICE*
 *******************/

messagingModule.factory('messagingService', 
	 
	function() {
	
		var MESSAGING_TYPE__SUCCESS = 'success';
		var MESSAGING_TYPE__ERROR = 'error';
	
		var messages = [];
		var factory = {};
		
		factory.getCurrentMessages = function() {
			return messages;
		};
		
		factory.setGenericCrudSaveSuccessMessage = function(entity) {
			
			var messageText = entity.className() + " [" + entity + "] saved successfully.";
			messages.push({type: MESSAGING_TYPE__SUCCESS, text: messageText});
		};
			
		factory.setGenericCrudSaveFailMessage = function(entity) {
			
			var messageText = "An error occurred attempting to save" + ' ' + entity.className() + " [" +  entity + "].";
			messages.push({type: MESSAGING_TYPE__ERROR, text: messageText});
		};
		
		factory.setGenericCrudDeleteSuccessMessage = function(entity) {
			
			var messageText = entity.className() + " [" + entity + "] deleted successfully.";
			messages.push({type: MESSAGING_TYPE__SUCCESS, text: messageText});
		};
		
		factory.setGenericCrudDeleteFailMessage = function(entity) {
			
			var messageText = "An error occurred attempting to delete" + ' ' + entity.className() + " [" +  entity + "].";
			messages.push({type: MESSAGING_TYPE__ERROR, text: messageText});
		};
		
		factory.removeMessage = function(index) {
		    messages.splice(index, 1);
		};
		
		return factory;
	}
);

messagingModule.controller('messagingController',
		
	function($scope, messagingService) {
	
		$scope.messages = messagingService.getCurrentMessages();
		
		$scope.removeMessage = function(index) {
			messagingService.removeMessage(index);
		};
	}
);