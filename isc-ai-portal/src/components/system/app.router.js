'use strict'
angular.module('iscAiApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, send to /
	$urlRouterProvider.otherwise('/predict')

	const homeState = {
		name: 'home',
		url: '/',
            // controller: 'HomeCtrl',
		templateUrl: '../../src/components/system/home.html'
	}
	const predictState = {
		name: 'predict',
		url: '/predict',
		controller: 'PredictCtrl',
		templateUrl: '../../src/components/predict/index.html'
	}
	const tlpState = {
		name: 'tlp',
		url: '/tlp',
            // controller: 'TlpCtrl',
		templateUrl: '../../src/components/tlp/index.html'
	}

	const simulationState = {
		name: 'simulation',
		url: '/simulation',
            // controller: 'SimulationCtrl',
		templateUrl: '../../src/components/simulation/index.html'
	}



	$stateProvider.state(homeState)
	$stateProvider.state(tlpState)
	$stateProvider.state(predictState)
	$stateProvider.state(simulationState)


	$stateProvider.state('predict.init', {
		url: '/predict-init',
		controller: 'PredictCtrl',
		templateUrl: '../../src/components/predict/config/dataUpload.html'
	}).state('predict.classify', {
		url: '/cfg-classify',
		controller: 'classifyController',
		templateUrl: '../../src/components/predict/config/classify.html'
	})

})
