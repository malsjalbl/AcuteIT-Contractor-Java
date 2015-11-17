
var dataModule = angular.module('data', ['ngResource']);
 
/* GENERIC DATA SERVICE*
 ***********************/

dataModule.factory('dataService', 
	 
	function($resource) {
	
		var NEW_ENTITY_ID = 0;
		
		var dataFactory = {};
		
		dataFactory.getEntityResource = function(resourceUrl, resourceId, customActions) {
			return $resource(resourceUrl, resourceId, customActions);
		};

		dataFactory.getAllEntities = function(entityResource) {
        	return entityResource.query();
        };
        
        dataFactory.getPage = function(entityResource, page) {
        	return entityResource.getPage({page:page});
        };
        
        dataFactory.getEntityById = function(EntityResource, id) {
        		return EntityResource.get({id: id});
        };
        
        dataFactory.deleteEntity = function(entity, successCallBack, failureCallBack) {
        	entity.$delete({id: entity.id},	function(value, responseHeaders) {successCallBack(value, responseHeaders);}, function(responseHeaders) {failureCallBack(responseHeaders);});
        };
        
        dataFactory.getNewEntity = function(EntityResource) {
        	return new EntityResource({id: NEW_ENTITY_ID});
        };
    
        dataFactory.saveEntity = function(entity, successCallback, failureCallback) {	
        	entity.$save(successCallback, failureCallback);
		};
		
		return dataFactory;
	}
);