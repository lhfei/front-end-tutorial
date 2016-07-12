StyleFactory = {}

StyleFactory = {

	getInstance: function(viewType, id){
		if(viewType === 'column'){
			var panel = new ColumnChartStyle();
			panel.create(id);
			return panel;
		}
	}
}