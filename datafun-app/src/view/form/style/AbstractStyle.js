AbstractStyle = {}

AbstractStyle.prototype = {
	itemId: null,
	width: 100,
	title: null,

	styleOps: null,

	//// current form fields alias
	titleAlias: null,
	widthAlias: null,
	heightAlias: null,

	needTitleId: null,
	titleId: null,
	widthId: null,
	heightId: null,
	
	_html: '',
	
	/**
	 * [initial description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	initial: function(id){
		this.id = id;
		this.itemId = this.alias + id;

		this.titleAlias = this.alias +'title-';
		this.widthAlias = this.alias +'width-';
		this.heightAlias = this.alias + 'height-';

		this.titleId = this.titleAlias + id;
		this.widthId = this.widthAlias +id;
		this.heightId = this.heightAlias +id;
		this.needTitleId = this.alias +'needtitle-' +id;
	},

	getHtml: function(){
		return this._html;
	},

	getTitle: function(){
		return $('#' +this.titleId).val();
	},

	getStyleOps: function(){		
		return this.styleOps;
	},

	loadData: function(ops){
		if(ops){
			$('#' +this.needTitleId).attr('checked', ops.needTitle);
			$('#' +this.titleId).val(ops.title)
			$('#' +this.widthId).val(ops.width);
			$('#' +this.heightId).val(ops.height)
		}
	},

	buildStyleOps: function(options){
		this.styleOps = this.styleOps || {};
		if(options){
			for(var i in options){
				this.styleOps[i] = options[i];	
			}
		}
	},	
}

jQuery.extend(true, AbstractStyle, DataFun);