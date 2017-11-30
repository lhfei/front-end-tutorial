'use strict'

angular.module('PredictApp')
	.controller('paramConfCtrl', ['$scope', '$http', '$sce', '$rootScope', function ($scope, $http, $sce, $rootScope, $compile) {

		console.log('apply controller loaded. ...')
		// 例子1
//		$scope.sayHello = function() {
//			var html="<label >我是后添加的</label>";
//			var template = angular.element(html);
//			angular.element("#div2").append(template);
//
//		};


		// 例子2
//		$http({
//			method: 'GET',
//			url: 'src/assets/data/data2.json'
//		}).then(function successCallback(response) {
//				$scope.names = response.data.sites;
//			}, function errorCallback(response) {
//				// 请求失败执行代码
//		});

//		<label >订单编号所在列名</label>
//		<input data-rule-required="true" data-msg-required="不能为空!" data-rule-maxlength="100" data-msg-maxlength="最大长度不能超过{0}" data-rule-minlength="1" data-msg-minlength="最小长度不能小于{0}" value="" class="bdp-algor-component-param-item-input bdp-form-control" name="form_210_1496807555225_907" id="form_210_1496807555225_907" data-paramid="907" data-paramname="orderCol" data-paramtype="3" data-paramdeleted="0" placeholder="请配置其他参数">
//	</div>
//	<div >
//		<label >最小支持度</label>
//		<input data-rule-required="true" data-msg-required="不能为空!" data-rule-max="1" data-msg-max="最大值不能超过{0}" data-rule-min="0" data-msg-min="最小值不能小于{0}" data-rule-maxlength="20" data-msg-maxlength="最大长度不能超过{0}" value="0.5" class="bdp-algor-component-param-item-input bdp-form-control" name="form_210_1496807555225_909" id="form_210_1496807555225_909" data-paramid="909" data-paramname="minSupport" data-paramtype="3" data-paramdeleted="0" placeholder="请配置其他参数">
//	</div>

		// 例子3
		$http({
			method: 'GET',
			url: 'src/assets/data/data4.json'
		}).then(function successCallback (response) {
				// 清空div6
			const children = angular.element('#div6').children()
				 console.log(children)
				 if(children != null) {
					 angular.element('#div6').empty()
				 }
				 // 添加div6子元素
			for(const model in response.data)  {
					 console.log('id:' + response.data[model].id + ',name:' + response.data[model].name + ',price:' + response.data[model].price )

					 const html1 = "<div id='id_" + response.data[model].id + "'>"

						   + '<label>' + response.data[model].name + '</label>'
						   + "<input   type='text'  id='input_" + response.data[model].id + "' value='" + response.data[model].price + "'"
						   + "onkeyup='value=value.replace(" + response.data[model].rule + ",&quot;&quot;)' "
						   + "onbeforepaste='clipboardData.setData(&quot;text&quot;,clipboardData.getData(&quot;text&quot;).replace(" + response.data[model].rule + ",&quot;&quot;))'/>"
						   + '</div>'
					 console.log(html1)
					 const template = angular.element(html1)
					 angular.element('#div6').append(template)
			}


		}, function errorCallback (response) {
				// 请求失败执行代码
		})

		// 往模型表插入参数数据
		$scope.submitParams = function () {
			 // $http.post采用postJSON方式发送数据到后台，
	        // 解决办法：在后台php中使用$postData=file_get_contents("php://input",true);这样就可以获得前端传送过来的数据
	        const postData = {msg: 'post的内容'}
	        const config = {params: {id: '5', name: '张三丰'}}
	        $http.post('postData.php', postData, config)
	                .success(function (data) {
	                    console.log(data)
	                })
	                .error(function (err) {
	                    // 错误代码
	                })

		}


	}])
