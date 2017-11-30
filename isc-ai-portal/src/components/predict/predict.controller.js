/**
 * Predict module Controller.
 *
 * @author: Hefei Li
 * @apiVersion 1.0.0
 */
'use strict';

angular.module('PredictApp')
    .controller('PredictCtrl', ['$scope', '$http', '$sce', '$rootScope', '$state', 'SERVER', function ($scope, $http, $sce, $rootScope, $state, SERVER) {


	const me = this

	me.MAX_STEPS = 4
	me.currentStep = 1
	me.doneSteps = 1

        // go by step
	$scope.goStep = function (step) {
		if (step === 1) { // go to next
			if (me.currentStep < me.MAX_STEPS) {
				me.currentStep += step

				me.doneSteps++
			}
		}
		else if (step === -1) { // go to previous
			if (me.currentStep > 1) {
				me.currentStep += step

				me.doneSteps--
			}
		}

            // $state.go("form." + $scope.selected.url);
	}

	$scope.wizardForm = function () {
            // var form = window.jQuery('#wizardForm')
            // 	form.smartWizard();
	}

        // upload file
	$scope.dzOptions = {
		withCredentials: true,
		url: SERVER.url + '/files/upload/1/1',
		paramName: 'files',
		maxFilesize: '1',
		acceptedFiles: '.txt, .csv',
		dictDefaultMessage: '将文件拖至此处或点击上传',
		dictFallbackMessage: '您的浏览器不支持拖放文件上传',
		dictFileTooBig: '文件过大 ({{filesize}}MiB). 超出最大限制: {{maxFilesize}}MiB.',
		dictInvalidFileType: '不支持此类型文件.',
		dictResponseError: '上传失败, 错误代码: {{statusCode}}.',
		dictCancelUpload: '取消上传',
		dictCancelUploadConfirmation: '确认取消上传此文件吗?',
		dictRemoveFile: '移除文件',
		dictRemoveFileConfirmation: null,
		dictMaxFilesExceeded: 'You can not upload any more files.',

		accept (file, done) {
			if (file.name === 'justinbieber.jpg') {
				done("Naha, you don't.")
			}
			else {
				done()
			}
		},
		addRemoveLinks: true
	}


        // Handle events for dropzone
        // Visit http://www.dropzonejs.com/#events for more events
	$scope.dzCallbacks = {
		addedfile (file) {
			console.log(file)
			$scope.newFile = file
		},
		success (file, xhr) {
			const array = xhr.body
			$('#fileId').attr('value', array[0].dataId)
			SERVER.fileId = array[0].dataId
			alert('恭喜您，上传文件成功！')
			$('#first_step').hide()
			$('#second_step').show()
			$('#third_step').hide()
		}
	}


        // Apply methods for dropzone
        // Visit http://www.dropzonejs.com/#dropzone-methods for more methods
	$scope.dzMethods = {}
	$scope.removeNewFile = function () {
		$scope.dzMethods.removeFile($scope.newFile) // We got $scope.newFile from 'addedfile' event callback
	}

	$scope.create = function () {
            // $state.transitionTo('predict.init', /*{id: newId},*/ {
            //     location: true,
            //     inherit: true,
            //     relative: $state.$current,
            //     notify: false
            // })
		$state.transitionTo('predict.init')
	}

	$scope.toShow = function (task) {
        	SERVER.task = task.taskId

		switch(task.currentStep) {
			case 1: $state.transitionTo('predict.init', {}, {reload: true}); break
			case 2:
			case 3:
			case 4: $state.transitionTo('predict.classify', {}, {reload: true}); break
			default: $state.transitionTo('predict.init', {}, {reload: true}); break
		}
	}
	$scope.toDel = function (task) {
		$http({
			method: 'GET',
			url: SERVER.url + '/tasks/del/' + task.taskId
		}).then(function successCallback (response) {
			$scope.tasks.splice($scope.tasks.indexOf(task), 1)
			alert(response.data.message)

		}, function errorCallback (response) {
			alert(response.data.message)
		})
	}

	$http({
		method: 'GET',
		url: SERVER.url + '/tasks',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function successCallback (response) {
		$scope.tasks = response.data.body
		for(const i in $scope.tasks) {
			const t = $scope.tasks[i]
			t.createDate = new Date(t.createDate).getTime()
			t.latestDate = new Date(t.latestDate).getTime()
		}
	}, function errorCallback (response) {
		alert(response.data.body.message)
	})
}])
