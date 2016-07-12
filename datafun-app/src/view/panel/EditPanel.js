/**
 * EditPanel
 *
 * This class is used for edited panel in dashboard view.
 *
 * Its layout management relies on Bootstrap3 .
 */
function EditPanel(){
	this.navPanel = new NavPanel();
	this.container = new ContainerPanel();
}

function NavPanel(){

};
function ContainerPanel (){

};

NavPanel.prototype = {
	alias: 'editpanel-navbar-',
	parentId: null,
	itemId: null,
	html: '',
	title: null,
	navHeadId: null,
	navBodyId: null,

	buttons: [{
		text: 'Priview',
		iconCls: 'glyphicon glyphicon-eye-open',
		handler: function(){
			alert('preivew ...')
		}
	},{
		text: 'Deploy',
		iconCls: 'glyphicon glyphicon-log-in',
		handler: function(){
			alert('deploy ...')
		}
	},{
		text: 'Save',
		iconCls: 'glyphicon glyphicon-floppy-save',
		handler: function(){
			alert('save ...')
		}
	}],

	/**
	 * [create description]
	 * @return dom object, and it innerHtml like below:
	 *
		 <div class="panel panel-info edit-panel" style="height: 100%">
	        <!-- <div class="panel-heading text-center">Edit Panel</div> -->
	        <nav class="navbar navbar-default" style="margin: 5px;">
	            <div class="container-fluid">
	                <div class="navbar-header">
	                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	                        <span class="icon-bar"></span>
	                        <span class="icon-bar"></span>
	                        <span class="icon-bar"></span>                                                
	                    </button>
	                    <a class="navbar-brand" href="#">Title</a>
	                </div>
	                <div class="collapse navbar-collapse" id="myNavbar">
	                    <!-- <ul class="nav navbar-nav">
	                        <li class="active"><a href="#">Home</a></li>
	                    </ul> -->
	                    <ul class="nav navbar-nav navbar-right">
	                        <li><a href="#"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Preview </a></li>
	                        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Deploy </a></li>
	                        <li><a href="#"><span class="glyphicon glyphicon-floppy-save"></span> Save </a></li>
	                    </ul>
	                </div>
	            </div>
	        </nav> 

	        <div class="panel-body" style="padding-top: 5px;">

	        </div>
	    </div> 
	 */
	create: function(){
		var me = this;
		me.ln = jd.lang.editpanel;
		me.title = me.ln.nav_title;
		me.itemId = me.alias + me.parentId;
		me.navHeadId = me.alias +'header-'+ me.parentId;
		me.navBodyId = me.alias +'body-'+ me.parentId;

		var div = me.createElement('div')
		$(div).attr('id', me.itemId);
		$(div).addClass('navbar navbar-default')

		// build buttons
		var navDiv = me.createElement('div');
		$(navDiv).addClass('container-fluid');

		var head = me.createElement('div');
		$(head).attr('id', me.navHeadId);
		$(head).addClass('navbar-header');

		// set navbar title 
		if(me.title){
			var link = me.createElement('a');
			$(link).attr('href', '#');
			$(link).addClass('navbar-brand');
			link.appendChild(document.createTextNode(me.title));
			head.appendChild(link);
		}

		var body = me.createElement('div');
		$(body).attr('id', me.navBodyId);
		$(body).addClass('collapse navbar-collapse');

		if(me.buttons && me.buttons.length > 0){
			var ul = me.createElement('ul');
			$(ul).addClass('nav navbar-nav navbar-right')
			for(var i = 0, ln = me.buttons.length; i < ln; i++){
				var button = me.buttons[i];
				var li = me.createElement('li');
				var ilink = me.createElement('a')
				var span = me.createElement('span');

				$(ilink).attr('href', '#');
				$(span).addClass(button.iconCls)
				ilink.appendChild(span);
				ilink.appendChild(document.createTextNode(' '+button.text));
				ilink.onclick = button.handler;

				li.appendChild(ilink);
				ul.appendChild(li);
			}

			body.appendChild(ul);
		}

		navDiv.appendChild(head);
		navDiv.appendChild(body);
		div.appendChild(navDiv);

		return div;
	},

	getNavHeadId: function(){
		return this.navHeadId;
	},
	getNavBodyId: function(){
		return this.navBodyId;
	},

	getHtml: function(){

	}
};

ContainerPanel.prototype = {
	parentId: null,
	itemId: null,
	alias: 'editpanel-container-',
	html: '',
	laytou: null,
	wrapAlias: 'wrap-div-',
	children: [],
	selectedIndex: -1,

	create: function(){
		var me = this;
		me.itemId = me.alias + me.parentId;

		var bodyDiv = me.createElement('div');
		var rowDiv = me.createElement('div');

		$(bodyDiv).addClass('panel-body');
		$(rowDiv).addClass('row container-row');
		$(rowDiv).attr('id', me.itemId);
		bodyDiv.appendChild(rowDiv);

		return bodyDiv;
	},

	/**
	 * [addFilter description]
	 * @param {[type]} texteditor [description]
	 */
	addFilter: function(texteditor){
		var me = this;

		// create an div, will be wrap the chart.
		var wrapDiv, chartId;
		
		wrapDiv = me.createElement('div');
		wrapDivId = texteditor.getWrapDivId();

		$(wrapDiv).attr('id', wrapDivId);
		$(wrapDiv).addClass('col-xs-12 editer-wrap');

		$('#' +me.itemId).append(wrapDiv);
		$('#' +wrapDivId).append(texteditor.getHtml());

		// added to the children array
		me.children.push({
			id: texteditor.getId(),
			type: texteditor.getType(),
			item: texteditor
		});

		me.bindActiveClass();
	},

	/**
	 * [addChart description]
	 * @param {[type]} options [description]
	 */
	addChart: function(options){
		var me = this;

		// create an div, will be wrap the chart.
		var wrapDiv, chartDiv, chartId;
		
		wrapDiv = me.createElement('div');
		chartDiv = me.createElement('div');
		chartId = options.chart.renderTo;
		$(chartDiv).attr('id', chartId);
		$(wrapDiv).attr('id', me.wrapAlias + chartId);
		$(wrapDiv).addClass('col-xs-12 editer-wrap');

		wrapDiv.appendChild(chartDiv)
		$('#' +me.itemId).append($(wrapDiv))

		var chart = new Highcharts.Chart(options);
		chart._id = chartId
		chart.itemId = chart.alias + chart._id;

		// added to the children array
		me.children.push({
			id: chartId,
			type: options.chart.type,
			item: chart
		});

		me.bindActiveClass();
	},


	addGrid: function(grid){
		var me = this;

		// create an div, will be wrap the chart.
		var wrapDiv, chartId;
		
		wrapDiv = me.createElement('div');
		wrapDivId = grid.getWrapDivId();

		$(wrapDiv).attr('id', wrapDivId);
		$(wrapDiv).addClass('col-xs-12 editer-wrap');

		$('#' +me.itemId).append(wrapDiv);
		$('#' +wrapDivId).append(grid.getHtml());

		/*if(grid.pagination){
			$('#' +grid.getPaginationId()).bootstrapPaginator(grid.defaultPagination);
		}*/

		// added to the children array
		me.children.push({
			id: grid.getId(),
			type: grid.getType(),
			item: grid
		});

		//me.bindActiveClass();
	},

	bindActiveClass: function(){
		var me = this;
		var children = $('#' +me.getItemId()).children();
		$.each(children, function(idx, item){
			$(item).click(function(){
				if(me.selectedIndex != idx){
					me.selectedIndex = idx;
					//remove before selected
					$('div .editer-active').each(function(i, e){
						$(this).removeClass('editer-active');
					});
					$(this).addClass("editer-active");
				}
			})
		})
	},

	getSelected: function(){
		var me = this;	
		return me.children[me.selectedIndex];
	},

	getSelectedIndex: function(){
		return me.selectedIndex;
	},

	getItemId: function(){
		return this.alias + this.parentId;
	},

	/**
	 * [getHtml description]
	 * @return {[type]} [description]
	 */
	getHtml: function(){

	}
};

EditPanel.prototype = {
	id: '',
	itemId: '',
	alias: 'editpanel-',
	html: '',
	layout: '',
	children: [],

	onSelected: null,

	beforeAdd: null,

	afterAdd: null,

	/**
	 * [create description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	create: function(id){
		var me = this;
		me.id = id;
		me.itemId = me.alias + id;

		// attach event listener
		$('body').on('click', me, function () {
			//me.onSelected(me);
			//$('#'+me.itemId).parent().toggleClass("editer-active")
		});

		me.navPanel.parentId = id;
		me.container.parentId = id;

		var div = me.createElement('div');
		$(div).attr('id', me.itemId);

		//$(div).addClass('container-fluid')
		$(div).addClass('panel panel-info edit-panel');

		var head = me.navPanel.create();
		var container = me.container.create();

		div.appendChild(head);
		div.appendChild(container)
		
		return div;
	},

	/**
	 * navigate bar
	 * @type {[type]}
	 */
	navPanel: null,

	/**
	 * [container description]
	 * @type {Object}
	 */
	container: null,

	/**
	 * appent a child.
	 */
	addFilter: function(obj){
		var me = this;
		container = me.container;
		container.addFilter(obj);
	},

	/**
	 * [addChart description]
	 * @param {[type]} options [description]
	 */
	addChart: function(options){
		var me = this;
		container = me.container;
		container.addChart(options);
	},

	addGrid: function(grip){
		var me = this;
		container = me.container;
		container.addGrid(grip);
	},

	getSelected: function(){
		return this.container.getSelected();
	},

	getSelectedIndex: function(){
		return this.container.getSelectedIndex();
	},

	/**
	 * resort children, then refresh layout view.
	 * @return {[type]} [description]
	 */
	resort: function(){
		var me = this;
	},

	setNavPanel: function(){

	},
	removeNavPanel: function(){

	},	

	refresh: function(){
		var me = this;
	}


}


jQuery.extend(true, EditPanel, DataFun);
jQuery.extend(true, NavPanel, DataFun);
jQuery.extend(true, ContainerPanel, DataFun);