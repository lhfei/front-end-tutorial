'use strict'

angular.module('iscAiApp', ['ui.router', 'PredictApp', 'TlpApp', 'SimulationApp', 'ngMessages']).constant('SERVER', {
	url: 'http://localhost:16000/api/v1',
	task: 1,
	fileId: 1
})

angular.module('PredictApp', ['ui.router', 'ngAnimate', 'thatisuday.dropzone', 'ngMessages']).constant('SERVER', {
	url: 'http://localhost:16000/api/v1',
	task: 1,
	fileId: 1
})
angular.module('TlpApp', []).constant('SERVER', {url: 'http://localhost:16000/api/v1', task: 1, fileId: 1})
angular.module('SimulationApp', []).constant('SERVER', {url: 'http://localhost:16000/api/v1', task: 1, fileId: 1})
