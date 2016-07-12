StyleFactory = {}

StyleFactory = {
	getInstance: function(viewType, id){
		try{
			if(viewType === 'line'){
				var panel = new LineChartStyle();
				panel.create(id);
				return panel;
			}
			if(viewType === 'column'){
				var panel = new ColumnChartStyle();
				panel.create(id);
				return panel;
			}
			if(viewType === 'pie'){
				var panel = new PieChartStyle();
				panel.create(id);
				return panel;
			}
			if(viewType === 'area'){
				var panel = new AreaChartStyle();
				panel.create(id);
				return panel;
			}
		}catch(e){console.warn("StylePanel instance error. ", e.message)}
	}
}