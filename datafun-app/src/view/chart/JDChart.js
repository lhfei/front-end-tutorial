/**
 * column-chart cmp.
 *
 * @author Hefei Li
 * @since  0.1.0
 */
 function JDChart() {};

(function (H) {
	// default constructor.
	H.Chart.prototype.initial = function(type, id, itemId){
		this._id = id;
		this.type = type;
		this.itemId = itemId;
	};

	H.Chart.prototype.xtype = 'chart';

	H.Chart.prototype.alias = null;

	H.Chart.prototype.stylePanel = null;

	H.Chart.prototype.type = null;
	/**
	 * The chart uuid.
	 */
	H.Chart.prototype._id = null;

	/**
	 * [itemId description]
	 * @type {[type]}
	 */
	H.Chart.prototype.itemId = null;

	H.Chart.prototype.getAlias = function(){
		return this.alias;
	};

	H.Chart.prototype.store = {};

	H.Chart.prototype.onSelected = function(chart){
		console.log('on selected event fired.')
	};

	/**
	 * get the chart's uuid
	 * @return id
	 */
	H.Chart.prototype.getId = function(){
		return this._id;
	};

	H.Chart.prototype.getItemId = function(){
		return this.itemId;
	};

	H.Chart.prototype.resize = function(options){
		var chart = $('#'+this.itemId).highcharts();
		chart.setSize(options.width, options.height);

		$('#'+this.itemId).parent().css({width: (parseInt(options.width) + 2)});
	};

}(Highcharts));

JDChart = jQuery.extend(true, JDChart, Highcharts);
JDChart = jQuery.extend(true, JDChart, AbstractView);

JDChart.prototype = {
	
	alias: null,
	itemId: null,

	initial: function(type, id){
		this.alias = type + '-chart-';
		this.itemId = this.alias + id;
	},

	/**
	 * Highcharts factory method.
	 * 
	 * @param  string type chart type, such as column,line,area and so on.
	 * @param  string id the uuid, which will be assigned as the div id append to the document.
	 * @param  object options
	 * @return highcharts or null
	 */	
	create: function(type,id, polar){
		var me,
			chart,
			options;
		
		me = this;
		options = {};

		
		try{
			if(arguments.length >= 2){
				polar = polar | null;
				// initial chart options
				me.initial(type, id);
				options = {
	                chart: {
	                	height: 200,
	                    renderTo: me.itemId,
	                    polar: polar,
	                    type: type
	                },
	                title: {
	                    text: 'JD Datafun'                 
	                },
	                subtitle: {
	                    text: ''
	                },
	                xAxis: {
	                    categories: []
	                },
	                yAxis: {
	                    title: {
	                        text: 'Sales'
	                    }
	                },
	                //series: []
	                series: [{
			            name: 'Allocated Budget',
			            data: [43000, 19000, 60000, 35000, 17000, 10000],
			            pointPlacement: 'on'
			        }, {
			            name: 'Actual Spending',
			            data: [50000, 39000, 42000, 31000, 26000, 14000],
			            pointPlacement: 'on'
			        }]
	            };		
	            		
	            // attached the onclick event listener to the chart.
	            $('body').on('click', '#' +me.itemId, function(){
	            	chart = $('#' +me.itemId).highcharts();
	            	chart.initial(type, id, me.itemId);

	            	if(chart.stylePanel == null){
	            		// create style panel instance.
						chart.stylePanel = StyleFactory.getInstance(type, id);
	            	}

	            	chart.onSelected(chart);
	            });

	            return options;
			}else{
				console.error('Illegal Argument Exception. The chart type and uuid is required.');
				return null;
			}
		}catch(e){
			console.error('Chart error.');
			return null;
		}
	}
}



