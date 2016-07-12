var AbstractView = {}

AbstractView.prototype = {
	store: {
		editer: null,
		schema: null,
		table: null,
		dimensions: [],
		measures: []
	},

	initStore: function(args){
		if(args){
			for(var i in args){
				this.store[i] = args[i];	
			}
		}		
	}
}