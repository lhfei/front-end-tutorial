'use strict'

angular.module('PredictApp')
    .controller('uploadCtr', ['$scope', '$http', '$sce', '$rootScope', 'SERVER', function ($scope, $http, $sce, $rootScope, SERVER) {

        // 页面初始化操作
	$scope.init = function () {
		$('#first_step').show()
		$('#second_step').hide()
		$('#third_step').hide()
	}

        // 保存文件基本信息
	$scope.saveFile = function () {
		$('#first_step').hide()
		$('#second_step').hide()
		$('#third_step').show()
		const fileId = $('#fileId').val()
		const fileName = $('input[name=fileName]').val()
		const fileSplit = $('input[name=fileSplit]').val()
		const fileheader = $('input[name=fileheader]:checked ').val()
		$http({
			method: 'GET',
			url: SERVER.url + '/files/preview/' + fileId + '?separator=' + fileSplit + '&firstCol=' + fileheader + '&fileName=' + fileName,
		}).then(function successCallback (response) {
			const dataSet = response.data.body.rows
			const columns = response.data.body.columns
			const table = $('#example')
			const header = $('<thead></thead>')
			const tr = $('<tr></tr>')
			const columnDefsSet = []
			$.each(columns, function (j, item) {
				if (j === 0) {
					var td = $(String("<th><div style='width: 200px;'>" +
                                '列名：<input type="text" value=' + item.name + " id='\"cName" + j + "\"' name=\'cName[]\' style=\"width:150px;\"/><br>" +
                                "别名：<input type=\"text\" value=\"\" id='\"alias" + j + "\"' name=\'alias[]\' style=\"width: 150px;margin-top:10px\" /><br>" +
                                '类型：' +
                                '<select id="cloumnType' + j + '" style="width: 150px;margin-top:10px">' +
                                '<option value="STRING">请选择数据类型</option> ' +
                                '<option value="NUMERIC">NUMERIC</option> ' +
                                '<option value="STRING">STRING</option>' +
                                '<option value="DATETIME">DATETIME</option>' +
                                '</select>') +
                                '</div></th>')
					td.appendTo(tr)
				}
				else {
					var td = $(String("<th><div style='width: 150px'>" +
                                '<input type="text" value=' + item.name + " id='\"cName" + j + "\"' name=\'cName[]\' style=\"width: 150px;\"/><br>" +
                                "<input type=\"text\" value=\"\" id='\"alias" + j + "\"' name=\'alias[]' style=\"width: 150px;margin-top:10px\"/><br>" +
                                '<select id="cloumnType' + j + '"  style="width: 150px;margin-top:10px">' +
                                '<option value="STRING">请选择数据类型</option> ' +
                                '<option value="NUMERIC">NUMERIC</option> ' +
                                '<option value="STRING">STRING</option>' +
                                '<option value="DATETIME">DATETIME</option>' +
                                '</select>') +
                                '</div></th>')
					td.appendTo(tr)
				}
				const json = new Object()
				json.defaultConten = td
				columnDefsSet[j] = JSON.stringify(json)
			})
			tr.appendTo(header)
			header.appendTo(table)

			for (let i = 0; i < dataSet.length; i++) {
				const nextTr = $('<tr></tr>')
				for (const key in dataSet[i]) {
					const td = $('<td>' + dataSet[i][key] + '</td>')
					td.appendTo(nextTr)
				}
				$('#example').append(nextTr)
			}
		}
            ), function errorCallback (response) {
                // 请求失败执行代码
}
	}


	function getValues (name) {
		const namesArray = []
		$("input[name^='" + name + "']").each(function (i) {
			namesArray[i] = $(this).val()
		})
		return namesArray
	}

	function getValues4Selected (name, length) {
		const namesArray = []
		for (let j = 0; j < length; j++) {
			namesArray[j] = $('#cloumnType' + j + ' option:selected').val()
		}
		return namesArray
	}


        // 保存文件基本信息
	$scope.saveTable = function () {
		const fileId = $('#fileId').val()
		const nameValues = getValues('cName')
		const alaisValues = getValues('alias')
		const typesValues = getValues4Selected('cloumntype', nameValues.length)
		const datas = []
		const fileConfig = new Object()
		for (let i = 0; i < nameValues.length; i++) {
			const data = new Object()
			data.name = nameValues[i]
			data.alais = alaisValues[i]
			data.type = typesValues[i]
			datas[i] = data
		}
		fileConfig.columns = datas
		$http({
			method: 'POST',
			url: SERVER.url + '/files/config/' + fileId,
			data: fileConfig,
		}).then(function successCallback (response) {
                // /SERVER.fileId=response.
			alert('数据信息保存成功！')
		}, function errorCallback (response) {
                // 请求失败执行代码
		})
	}

}])



