'use strict';

var dataWorker = angular.module('DataWorkerApp', [
    'ui.bootstrap',
    'xdata.exp.dataworker'
]);


dataWorker.controller('dataworkerCtrl', function($scope, DataWorker, BaseUrlSrv) {
    $scope.load = function() {
        var loadHandler = function(data) {
        	alert('Job execute complete. And the result has been received.');
            console.log('Job execute complete. And the result has been received.')
            console.log(data)
        };

        DataWorker.load(loadHandler)

        alert(123)
    };
});
