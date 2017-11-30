var _root = 'src/components/predict/';
angular.module('iscAiApp')
    // .config(function($stateProvider, $urlRouterProvider) {
    //     // For any unmatched url, redirect to /state1
    //     $urlRouterProvider.otherwise("/taskMan");
    //     // Now set up the states
    //     $stateProvider
    //         .state('taskMan', { // task manage view
    //             url: "/taskMan",
    //             templateUrl: _root +"taskMan.html"
    //         })
    //         .state('config.init', {
    //             url: "/cfg-init",
    //             templateUrl: _root+"config/init.html"
    //         })
    //         .state('config.classify', {
    //             url: "/cfg-classify",
    //             templateUrl: _root+"config/classify.html"
    //         })
    //         .state('config.apply', {
    //             url: "/cfg-apply",
    //             templateUrl: _root+"config/apply.html"
    //         })
    //         .state('config.visualize', {
    //             url: "/cfg-visualize",
    //             templateUrl: _root+"config/visualize.html"
    //         });
    // })
    .controller('PredictCtrl', PredictCtrl);


PredictCtrl.$inject = [
  '$scope',
  '$window'
];

function PredictCtrl($scope, $window) {
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

