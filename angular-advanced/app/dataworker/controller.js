/**
 * [description]
 * @param  {[type]} $scope                    [description]
 * @param  {[type]} DataWorker){	$scope.load [description]
 * @return {[type]}                           [description]
 */
'use strick';
dataWorker.controller('dataworkerCtrl', function($scope, DataWorker, BaseUrlSrv){
	$scope.load = function() {
		var loadHandler = function(name){
			var url = BaseUrlSrv.getRestApiBase();
            console.log('REST base url == {}', url);
			alert(name)
		};

		DataWorker.load(loadHandler)

		alert(123)
	};	
});