/**
 * ISC AI App Controller.
 *
 * @author: Hefei Li
 * @apiVersion 1.0.0
 */
'use strict'

angular.module('iscAiApp')
	.controller('IscAiController', ['$scope', '$http', '$sce', '$rootScope', 'SERVER', function ($scope, $http, $sce, $rootScope, SERVER) {

		console.log('Started ...')

		console.log(`Server running at ... ${SERVER}`)

	}])
