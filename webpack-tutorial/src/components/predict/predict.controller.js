angular.module('iscAiApp')
	.controller('PredictCtrl', PredictCtrl);

PredictCtrl.$inject = [
  '$scope',
  '$window'
];

function PredictCtrl($scope, $window, dropzoneOpsProvider) {
	var me = this;

	me.MAX_STEPS = 4;
	me.currentStep = 4;

	$scope.init = function() {
		window.jQuery('#table').bootstrapTable({
		    url: 'src/assets/data/data.json',
		    columns: [{
		        field: 'id',
		        title: '任务 ID'
		    }, {
		        field: 'name',
		        title: '任务名称 Name'
		    }, {
		        field: 'price',
		        title: 'Item Price'
		    }, ]
		});
	};

	// go by step
	$scope.goStep = function(step){
		if(me.currentStep >= me.MAX_STEPS){
			me.currentStep = 1;
		}

		me.currentStep += step;
	}


	// window.onload = function() {
	// 	var form = window.jQuery('#wizardForm');
	// 	form.smartWizard();
	// }

	$scope.wizardForm = function(){
		// var form = window.jQuery('#wizardForm')
		// 	form.smartWizard();
	}
};

// angular.element($window).bind('load', function() {
//      console.log(123);
// });

