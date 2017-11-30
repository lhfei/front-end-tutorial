/**
 * Created by tangefan on 2017/6/7.
 */

angular.module('PredictApp')
    .factory('classifyService', function($http, SERVER) {

        let scope
        const constants = {
            fileId: SERVER.file || 2,
            fileUrl: SERVER.url + '/files/config/',
            /* url/{fileId}*/
            modelListUrl: SERVER.url + '/models',
            modelParamsUrl: SERVER.url + '/models/',
            /* url/{id}*/
            createTaskUrl: SERVER.url + '/tasks/update'
        }
        var service = {
            init($scope) {
                scope = $scope
                service.queryModelList()
                service.queryFileCols(constants.fileId)
                $('#fileColSourceSortable, #sampleColumnList, #targetColumnList').sortable({
                    connectWith: '.connectedSortable',
                    receive(event, ui) {
                        const modelDefineList = $('#modelPanelColumnList').find('li')
                        const colPanelList = $('#sampleColumnList').find('li')

                        /* receive done, size changed*/
                        if (modelDefineList.length < colPanelList.length) {
                            $('#fileColSourceSortable, #sampleColumnList, #targetColumnList').sortable('cancel')
                        }
                        service.align(false)
                    }
                }).disableSelection()
            },

            /**
             * 查询模型列表
             * 模型列表$scope.modelList
             */
            queryModelList() {
                const promise = $http({
                    method: 'GET',
                    url: constants.modelListUrl,
                    params: {},
                    responseType: 'json'
                })
                promise.then(function(response, status) {
                    if (response && response.data && response.data.status == 'OK') {
                        scope.modelList = response.data.body
                    } else {
                        service.alertBox('无法查询模型列表！')
                        console.log(response)
                    }
                }, function(data, status) {
                    service.alertBox('无法查询模型列表！')
                    console.log(data)
                })
            },

            /**
             * 查询文件的列
             * 文件列$scope.fileColList
             * @param id 文件ID
             */
            queryFileCols(id) {
                const promise = $http({
                    method: 'GET',
                    url: constants.fileUrl + id,
                    params: {}
                })
                promise.then(function(response, status) {
                    if (!(response && response.data)) {
                        service.alertBox('数据源文件异常！')
                        console.log(response)
                        return

                    }
                    if (!(response.data.status == 'OK' && response.data.body)) {
                        service.alertBox('数据源文件不存在！')
                        console.log(response)
                        return
                    }
                    scope.file = response.data.body
                    scope.fileColList = scope.file.columns /* index 不可用*/
                    scope.$watch('fileColList', function() {
                        service.align(true)
                    })
                }, function(data, status) {
                    console.log(data)
                })
            },

            /**
             * 查询模型的参数，包括输入列信息以及算法参数
             * 模型列 $scope.modelColList
             * 算法参数 $scope.modelParam
             * @param id 模型ID
             */
            queryModelParams(id) {
                const promise = $http({
                    method: 'GET',
                    url: constants.modelParamsUrl + id,
                    params: {}
                })
                promise.then(function(response, status) {

                    if (!(response && response.data)) {
                        service.alertBox('查询模型异常！')
                        console.log(response)
                        return

                    }
                    if (!(response.data.status == 'OK' && response.data.body)) {
                        service.alertBox('模型不存在！')
                        console.log(response)
                        return
                    }

                    const model = response.data.body
                    let modelParams = response.data.body.modelParams

                    if (typeof(modelParams) === 'string') {
                        modelParams = JSON.parse(modelParams)
                    } else if (typeof(modelParams) === 'object') {
                        /* do nothing*/
                    } else {
                        console.log('未知的类型')
                    }
                    // 模型列 列表
                    // scope.modelColList = modelParams.columns;
                    // scope.modelParams = modelParams;
                    scope.modelColList = modelParams.columns
                    scope.modelParams = modelParams.params
                        // 面板 模型列
                        // scope.classifyModel.modelColumnList = modelParams.columns;
                    scope.classifyModel.model = model

                    // for (var modelColKey in scope.modelColList) {
                    //     scope.modelColCheckbox[scope.modelColList[modelColKey].name] = true;
                    // }
                    scope.$watch('modelParams', service.align)
                }, function(data, status) {
                    console.log(data)
                })
            },

            /**
             * 提交数据，保存为任务
             * @param request : json object
             */
            submit(request) {
                const promise = $http({
                    method: 'POST',
                    url: constants.createTaskUrl,
                    data: request
                })
                promise.then(function(response, status) {
                    if (!(response && response.data && response.data.status == 'OK')) {
                        service.alertBox('保存失败，请稍后重试！')
                        console.log(response)
                        return

                    }
                    service.alertBox('成功保存选择信息')
                }, function(data, status) {
                    service.alertBox('保存失败，请稍后重试！')
                    console.log(data)
                })
            },

            /**
             * 根据复选框选择情况，获取已选中的模型列
             * @returns {Array}
             */
            getCheckedModelCol() {
                const panCol = []
                const modelColumnList = scope.modelColList
                for (const colIndex in modelColumnList) {
                    if (scope.modelColCheckbox[modelColumnList[colIndex].name]) {
                        panCol.push(modelColumnList[colIndex])
                    }
                }
                return panCol
            },

            /**
             * 根据模型获取request对象
             * @return json object
             */
            buildSubmitRequest() {
                const _columns = $('#sampleColumnList').find('li').find('input').map(function(i, e) {
                    const obj = scope.fileColList[$(e).val().trim()]
                    return {
                        name: obj.name,
                        alias: obj.alias,
                        // type
                        index: 0
                    }
                })
                const columns = []
                for (var i = 0; i < _columns.length; i++) {
                    columns.push(_columns[i])
                }
                const _target = $('#targetColumnList').find('li').find('input').map(function(i, e) {
                    const obj = scope.fileColList[$(e).val().trim()]
                    return {
                        name: obj.name,
                        alias: obj.alias,
                        // type
                        index: 0
                    }
                })
                const target = []
                for (var i = 0; i < _target.length; i++) {
                    target.push(_target[i])
                }
                const params = scope.modelParams.map(function(e) {
                    return {
                        name: e.name,
                        alias: e.zName,
                        normal: e.value,
                        // type
                        index: 0
                    }
                })

                const fileConfig = {
                    split: scope.file.split,
                    name: scope.file.name,
                    originName: scope.file.originName,
                    firstAsHead: scope.file.firstAsHead,
                    location: scope.file.location,
                    columns,
                    target,
                    params
                }

                return {
                    taskId: SERVER.task,
                    modelId: scope.classifyModel.model.modelId,
                    taskName: scope.taskName,
                    fileConfig
                }
            },

            /**
             * 检查请求对象
             * @param request
             * @returns {boolean}
             */
            validateRequest(request) {
                if (!scope.taskName || scope.taskName == '') {
                    service.alertBox('请填写任务名称')
                    $('#taskName').focus()
                    return false
                }
                return true
            },
            alertBox(message) {
                window.alert(message)
            },
            align(notSkipAlign) {
                const innerList = Array.from($('#modelPanelColumnList, #sampleColumnList, #targetColumnList, #fileColSourceSortable'))
                const panelList = Array.from($('#modelParamsPanel, #fileColMappingPanel'))
                if (notSkipAlign) {
                    let isAlign = true
                    let sheight = 'null'
                    innerList.forEach(function(e) {
                        if (isAlign && sheight != 'null' && $(e).css('height') != sheight) {
                            isAlign = false
                        } else {
                            sheight = $(e).css('height')
                        }
                    })
                    if (isAlign) {
                        sheight = 'null'
                        panelList.forEach(function(e) {
                            if (isAlign && sheight != 'null' && $(e).css('height') != sheight) {
                                isAlign = false
                            } else {
                                sheight = $(e).css('height')
                            }
                        })
                    }
                    if (isAlign) {
                        return
                    }
                }
                innerList.forEach(function(e) {
                    $(e).css('height', 'auto')
                })
                const maxListSize = innerList.reduce(function(max, e) {
                    let height = $(e).css('height')
                    height = height ? parseInt(height.replace('px', '')) : 0
                    return max < height ? height : max
                }, 0)
                innerList.forEach(function(e) {
                    $(e).css('height', maxListSize + 'px')
                })

                panelList.forEach(function(e) {
                    $(e).css('height', 'auto')
                })
                const maxPanelSize = panelList.reduce(function(max, e) {
                    let height = $(e).css('height')
                    height = height ? parseInt(height.replace('px', '')) : 0
                    return max < height ? height : max
                }, 0)
                panelList.forEach(function(e) {
                    $(e).css('height', maxPanelSize + 'px')
                })

            }

        }
        return service
    })

angular.module('PredictApp')
    .controller('classifyController', ['$scope', 'classifyService',
        function($scope, classifyService) {

            $scope.fileColList = []
            $scope.modelList = []
            $scope.modelColList = []
            $scope.modelParams = {}

            $scope.modelColCheckbox = {}

            $scope.taskId = 7 // fixed during dev
            $scope.taskName = ''
            $scope.targetModelColCheck = {}

            $scope.file = {}
            $scope.classifyModel = {
                model: 0,
                modelParamIndex: -1,
                selectedModelId: '',
                selectedModelName: '',
                modelColumnList: []
            }

            $scope.expr = {
                colFull: false,
                modelSelected: false
            }

            classifyService.init($scope)

            // 下拉列表模型选择事件
            $scope.selectModel = function(id, name) {

                classifyService.queryModelParams(id)
                $scope.expr.modelSelected = true
            }

            // 点击模型列复选框事件
            $scope.modelParamCheck = function(index) {
                $scope.classifyModel.modelParamIndex = index
                $scope.$watch('classifyModel.modelParamIndex', classifyService.align)
            }

            // 点击提交按钮事件
            $scope.submitTask = function() {
                const request = classifyService.buildSubmitRequest()
                if (classifyService.validateRequest(request)) {
                    classifyService.submit(request)
                }
                // $('#submitModal').modal('hide');
            }
        }
    ])
