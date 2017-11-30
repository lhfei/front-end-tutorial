const _root = 'src/components/predict/'
angular.module('PredictApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /cfg-classify
	$urlRouterProvider.otherwise('/predict')
        // Now set up the states
	$stateProvider
            .state('taskMan', { // task manage view
	url: '/taskMan',
	templateUrl: _root + 'taskMan.html'
})
            .state('predict.init', {
	url: '/cfg-init',
	controler: 'ApplyCtrl',
	templateUrl: _root + 'config/dataUpload.html'
})
            .state('predict.classify', {
	url: '/cfg-classify',
	templateUrl: _root + 'config/classify.html'
})
            .state('predict.apply', {
	url: '/cfg-apply',
	templateUrl: _root + 'config/apply.html'
})
            .state('predict.visualize', {
	url: '/cfg-visualize',
	templateUrl: _root + 'config/visualize.html'
})
})
