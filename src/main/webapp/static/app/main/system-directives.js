angular.module('app', [])

  .directive('myDataList', function() {
	  
    return {

    	restrict: 'AE',
    	replace: true,
    	/*scope: {
    		dataSourceInfo: '=dataSource'
    	},*/
    	template: '{{contracts}}'
    };
  });

