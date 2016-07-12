/**
 * [ConfigurePanel description]
 */
function ConfigurePanel(options){
	if(options){
		for(var i in options){
			this[i] = options[i];	
		}
	}
}

/**
 * [prototype description]
 * @type {Object}
 */
ConfigurePanel.prototype = {
	id: null,
	itemId: null,
	alias: 'configurepanel-',
	html: '',
	selectedFields: [],

	styleTabId: 'configurepanel-style',
	advanTabId: 'configurepanel-advan',

	schemaComboId: 'ds-schema',
	tableComboId: 'ds-table',
	dimensionComboId: 'ds-dimension',
	measureComboId: 'ds-measure',

	onChangeHandlers: [{
		id: 'ds-schema',
		store: function(){
			return DatasourceStore.getSchemas();
		},
		handler: function(panel, option){
			var schema, data;
			data = [];
			schema = option.value;
			var response = DatasourceStore.getTables(schema);
			if(response.success){
				data = response.data;
			}
			data.unshift(DatasourceStore.getDefaultOption());
			panel.adapterCombobox('ds-table', data)
		}  
	},{
		id: 'ds-table',
		store: function(schema){
			return DatasourceStore.getTables(schema);
		},
		handler: function(panel, option){
			var table, data;
			data = [];
			table = option.value;

			var response = DatasourceStore.getFields(table);
			if(response.success){
				data = response.data;
			}
			panel.adapterCombobox('ds-dimension', data);
			panel.adapterCombobox('ds-measure', data);		
		} 
	},{
		id: 'ds-dimension',
		store: function(schema){
			return DatasourceStore.getTables(schema);
		},
		handler: function(panel, option){

			alert(3)
		} 
	},{
		id: 'ds-measure',
		store: function(schema){
			return DatasourceStore.getTables(schema);
		},
		handler: function(panel, option){
			alert(44)
		} 
	}],

	loadData: null,

	/**
	 * [create description]
	 * @return {[type]} [description]
	 *

		<div id="configurepanel" class="panel panel-info edit-panel">
			<div class="panel-body">
				<ul class="nav nav-tabs" id="configurepanel-nav">
					<li class="active">
						<a data-toggle="tab" href="#configurepanel-dataset">Data</a>
					</li>
					<li>
						<a data-toggle="tab" href="#configurepanel-style">Style</a>
					</li>
					<li>
						<a data-toggle="tab" href="#configurepanel-advan">Advanced</a>
					</li>
				</ul>
				<div class="tab-content">
					<div id="configurepanel-dataset" class="tab-pane fade in active" style="padding-top: 15px">
						<form class="form-horizontal">
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-schema">数据库:</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-schema">
										<option value="-1">请选择</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-table">数据表:</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-table">
										<option value="-1">请选择</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-dimension">维度:</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-dimension">
										<option value="-1">-- 请选择 --</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-measure">度量:</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-measure">
										<option value="-1">-- 请选择 --</option>
									</select>
								</div>
							</div>
						</form>
						<!-- Sorter Columns Form -->
						<form class="form-horizontal">
							<div class="well well-sm">排序字段</div>
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-sorter-col">字段A</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-sorter-col">
										<option value="-1">无</option>
										<option value="asc">升序</option>
										<option value="desc">降序</option>
									</select>
								</div>
							</div>
						</form>
						<!-- Sorter Columns Form End-->
						<!-- Dataview setting Form -->
						<form class="form-horizontal">
							<div class="well well-sm">显示设置</div>
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-preview-size">预览行数</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-preview-size">
										<option value="500">500</option>
										<option value="1000">1000</option>
										<option value="1500">1500</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-4 control-label" for="ds-refresh-frequency">刷新频率</label>
								<div class="col-sm-8">
									<select class="form-control" id="ds-refresh-frequency">
										<option value="5">5分钟</option>
										<option value="10">10分钟</option>
										<option value="15">15分钟</option>
									</select>
								</div>
							</div>
						</form>
						<!-- Dataview setting End-->
						<ul class="nav nav-pills pull-right" id="create-cube-btn">
							<li>
								<button id="ds-refresh-btn" type="button" class="btn btn-info btn-sm">刷新数据</button>
							</li>
						</ul>
					</div>
					<div id="configurepanel-style" class="tab-pane fade">				</div>
					<div id="configurepanel-advan" class="tab-pane fade">			</div>
				</div>
			</div>
		</div>
	 * 
	 * 
	 */
	create: function(){
		var me = this;
		me.html = '<div id="configurepanel" class="panel panel-info edit-panel"><div class="panel-body"><ul class="nav nav-tabs" id="configurepanel-nav"><li class="active"><a data-toggle="tab" href="#configurepanel-dataset">Data</a></li><li><a data-toggle="tab" href="#configurepanel-style">Style</a></li><li><a data-toggle="tab" href="#configurepanel-advan">Advanced</a></li></ul><div class="tab-content"><div id="configurepanel-dataset" class="tab-pane fade in active" style="padding-top: 15px"><form class="form-horizontal"><div class="form-group"><label class="col-sm-4 control-label" for="ds-schema">数据库:</label><div class="col-sm-8"><select class="form-control" id="ds-schema"><option value="-1">请选择</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="ds-table">数据表:</label><div class="col-sm-8"><select class="form-control" id="ds-table"><option value="-1">请选择</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="ds-dimension">维度:</label><div class="col-sm-8"><select class="form-control" id="ds-dimension"><option value="-1">-- 请选择 --</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="ds-measure">度量:</label><div class="col-sm-8"><select class="form-control" id="ds-measure"><option value="-1">-- 请选择 --</option></select></div></div></form><!-- Sorter Columns Form --><form class="form-horizontal"><div class="well well-sm">排序字段</div><div class="form-group"><label class="col-sm-4 control-label" for="ds-sorter-col">字段A</label><div class="col-sm-8"><select class="form-control" id="ds-sorter-col"><option value="-1">无</option><option value="asc">升序</option><option value="desc">降序</option></select></div></div></form><!-- Sorter Columns Form End--><!-- Dataview setting Form --><form class="form-horizontal"><div class="well well-sm">显示设置</div><div class="form-group"><label class="col-sm-4 control-label" for="ds-preview-size">预览行数</label><div class="col-sm-8"><select class="form-control" id="ds-preview-size"><option value="500">500</option><option value="1000">1000</option><option value="1500">1500</option></select></div></div><div class="form-group"><label class="col-sm-4 control-label" for="ds-refresh-frequency">刷新频率</label><div class="col-sm-8"><select class="form-control" id="ds-refresh-frequency"><option value="5">5分钟</option><option value="10">10分钟</option><option value="15">15分钟</option></select></div></div></form><!-- Dataview setting End--><ul class="nav nav-pills pull-right" id="create-cube-btn"><li><button id="ds-refresh-btn" type="button" class="btn btn-info btn-sm">刷新数据</button></li></ul></div><div id="configurepanel-style" class="tab-pane fade">				</div><div id="configurepanel-advan" class="tab-pane fade"></div></div></div></div>' ;
		
		// register event
		for(var i = 0; i < me.onChangeHandlers.length; i++){
			var handler = me.onChangeHandlers[i];
			// onchange event invoke handler
			$('body').on('change', '#' +handler.id, function(e){
				var option = $(this)[0];				
				var id = option.id;
				for(var j = 0; j < me.onChangeHandlers.length; j++){
					var delegate = me.onChangeHandlers[j];
					if(delegate.id === id){
						delegate.handler(me, option);
						break ;
					}
				}

				// bind customer event
				for(var j = 0; j < me.onChanges.length; j++){
					var delegate = me.onChanges[j];
					if(delegate.id === id){
						delegate.handler(me, option);
						break ;
					}
				}
			});
		};

		// bind refresh data event.
		$('body').on('click', '#ds-refresh-btn', function(e){
			me.loadData();
		});

		me.complete(me);

		return me;
	},

	getHtml: function(){
		return this.html;
	},

	/**
	 * When the component create completed, then fire the event.
	 * @return {[type]} [description]
	 */
	complete: function(){},

	launch: function(){
		var me, store;		
		me = this;

		// initial comobobx: #ds-schema
		store = DatasourceStore.getSchemas();
		var schemas = store.data;
		schemas.unshift(DatasourceStore.getDefaultOption())
		me.adapterCombobox('ds-schema', store.data);
	},

	/**
	 * [adapterCombobox description]
	 * @param  {[type]}   target   [description]
	 * @param  {[type]}   options  [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	adapterCombobox: function(target, options, callback){
		var combo = $('#' +target);
		if(combo){
			$(combo).children().each(function(){
				$(this).remove();
			});

			$.each(options, function(idx, item){
				$(combo).append('<option value="'+item.value+'">' +item.text+ '</option')
			})

			if(callback){
				callback(options)
			}

		}else{
			console.error('Combobox[' +target+ '] does not exists.')
		}
	},

	effectOnChange: function(option){
		/* Iterate over the onChanges array, 
			if this item's index is after the target, then trige to true; */
		var me, isAfter, defaultOption;
		me = this;
		isAfter = false;
		defaultOption = DatasourceStore.getDefaultOption();

		for(var i = 0; i < me.onChanges.length; i++){
			var handler = me.onChanges[i];
			if(isAfter){
				me.adapterCombobox(handler.id, defaultOption, null);				
			};
			if(handler.id === option.id){
				isAfter = true;
			}
		}
	},

	/**
	 * [bindDatasource2View description]
	 * @return {[type]} [description]
	 */
	bindDatasource2View: function(view){
		var me;
		me = this;

		if(view){
			schema = me.getSchemaCombo().val();
            table = me.getTableCombo().val();
            view.item.store = {editer: view.id, schema: schema, table: table};
		}
	},

	/**
	 * [getSchemaCombo description]
	 * @return {[type]} [description]
	 */
	getSchemaCombo: function() {
		return $('#' +this.schemaComboId);
	},

	/**
	 * [getTableCombo description]
	 * @return {[type]} [description]
	 */
	getTableCombo: function(){
		return $('#' +this.tableComboId);
	},

	/**
	 * [getDimensionCombo description]
	 * @return {[type]} [description]
	 */
	getDimensionCombo: function(){
		return $('#' +this.dimensionComboId);
	},

	/**
	 * [getMeasureCombo description]
	 * @return {[type]} [description]
	 */
	getMeasureCombo: function(){
		return $('#' +this.measureComboId);
	},


	/////////////////////////////////////
	///// StylePanel
	////////////////////////////////////
	initStylePanel: function(chart){
		var me, tab, panel, width, height;
		me = this;
		tab = $('#' +me.styleTabId);
		panel = chart.stylePanel;

		// remove all children before append
		$(tab).children().each(function(){
			$(this).remove();
		});
		if(panel){
			$(tab).append(panel.getHtml());
			
			if(panel.styleOps == null){
				//initial width and height.
				var chartParent = $('#' +chart.getItemId()).parent();
				width = $(chartParent).width();
				height = $(chartParent).height();

				var options = {
					title: '',
					needTitle: true,
					width: width,
					height: height
				};
				panel.buildStyleOps(options);
				panel.loadData(options);
			}else {
				panel.loadData(panel.getStyleOps());
			}
		}
		
		
	}
}


jQuery.extend(true, ConfigurePanel, DataFun);