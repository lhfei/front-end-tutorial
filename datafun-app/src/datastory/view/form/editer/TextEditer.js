/**
 *
 * _html: 
	'<form id="editer-form-' +this.id+ '" class="form-inline" role="form">'
	+'    <div class="form-group col-sm-4">'
	+'      <label for="colname-' +this.id+ '">' +ln.colname+ ':</label>'
	+'      <select class="form-control" id="colname-' +this.id+ '" name="colname"></select>'
	+'    </div>'
	+'    <div class="form-group col-sm-4">'
	+'	  <label for="colrule-' +this.id+ '">' +ln.colrule+ ':</label>'
	+'	  <select class="form-control" id="colrule-' +this.id+ '" name="colrule"></select>'
	+'    </div>'
	+'    <div class="form-group col-sm-4">'
	+'      <label for="colvalue-' +this.id+ '">' +ln.colvalue+ ':</label>'
	+'      <input type="text" class="form-control" id="colvalue-' +this.id+ '" name="colvalue" style="width: 60%" placeholder="' +ln.colvalue_ph+ '" />'
	+'    </div>'
	+'  </form>'
 * 
 */
function TextEditor() {
	
}

TextEditor.prototype = {
	id: null,
	itemId: null,
	alias: 'editer-form-',

	isWraped: false,
	colNameAlias: 'colname-',
	colRuleAlias: 'colrule-',
	colValueAlias: 'colvalue-',

	xtype: 'text',
	data: [],
	_html: '',
	
	store: {
		schma: null,
		table: null,
		dimensions: [],
		measures: []
	},

	wrapAlias: 'wrap-div',

	onSelected: null,

	/**
	 * return the text-editer form id
	 */
	getId: function(){
		return this.id;
	}, 

	getItemId: function(){
		return this.alias + this.id;
	}, 
	getType: function(){
		return this.xtype;
	},

	getWrapDivId: function(){
		return this.wrapAlias + this.id;
	},

	getColNameId: function(){
		return this.colNameAlias + this.id;
	},

	getColRuleId: function(){
		return this.colRuleAlias + this.id;
	},

	getColValueId: function(){
		return this.colValueAlias + this.id;
	},

	getColName: function(){
		return $('#' +this.getColNameId()).val();
	},

	getColRule: function(){
		return $('#' +this.getColRuleId()).val();
	},

	getColValue: function(){
		return $('#' +this.getColValueId()).val();
	},

	getColNameCombo: function(){
		return $('#' +this.getColNameId());
	},

	getColRuleCombo: function(){
		return $('#' +this.getColRuleId());
	},

	getColValueCombo: function(){
		return $('#' +this.getColValueId());
	},

	/**
	 * [create description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 *
	 *	'<form id="editer-form-' +this.id+ '" class="form-inline" role="form">'
		+'    <div class="form-group">'
		+'      <label for="' +this.getColNameId()+ '">' +ln.colname+ ':</label>'
		+'      <select class="form-control" id="' +this.getColNameId()+ '" placeholder="' +ln.colname_ph+ '"></select>'
		+'    </div>'
		+'    <div class="form-group">'
		+'	  <label for="' +this.getColRuleId()+ '">' +ln.colrule+ ':</label>'
		+'	  <select class="form-control" id="' +this.getColRuleId()+ '" placeholder="' +ln.colrule_ph+ '"></select>'
		+'    </div>'
		+'    <div class="form-group">'
		+'      <label for="' +this.getColValueId()+ '">' +ln.colvalue+ ':</label>'
		+'      <input type="text" class="form-control" id="' +this.getColValueId()+ '" name="colvalue" style="width: 60%" placeholder="' +ln.colvalue_ph+ '" />'
		+'    </div>'
		+'  </form>' 
	 */
	create: function(id){
		var me, ln;

		me = this;
		ln = jd.lang.editer;
		me.id = id;
		me.itemId = me.alias + me.id;

		me._html = '<form id="' +this.getItemId()+ '" class="form-inline" role="form">' +' <div class="form-group col-sm-4">' +' <label for="' +this.getColNameId()+ '">' +ln.colname+ ':</label>' +' <select class="form-control" id="' +this.getColNameId()+ '" name="colname"></select>' +' </div>' +' <div class="form-group col-sm-4">' +' <label for="' +this.getColRuleId()+ '">' +ln.colrule+ ':</label>' +' <select class="form-control" id="' +this.getColRuleId()+ '" name="colrule"></select>' +' </div>' +' <div class="form-group col-sm-4">' +' <label for="' +this.getColValueId()+ '">' +ln.colvalue+ ':</label>' +' <input type="text" class="form-control" id="' +this.getColValueId()+ '" name="colvalue" style="width: 60%" placeholder="' +ln.colvalue_ph+ '" />' +' </div>' +' </form>';

		$('body').on('click', '#'+me.getWrapDivId(), function() {
			me.onSelected(me);
		});

		return me;
	},

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

	getHtml: function(){
		return this._html;
	},

	loadData: function(data){
		this.data = data;
	}
}

jQuery.extend(true, TextEditor, AbstractView);