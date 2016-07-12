var AbstractGrid = {}

AbstractGrid.prototype = {

	id: null,

	itemId: null,

	alias: 'jd-grid-',

	_html: '',

	type: 'grid',

	selType: 'rownum',

	wrapAlias: 'wrap-div',

	columns: [],


	pagination: null,

	pgAlias: '',

	paginationId: null,

	singleSelect: true,

	defaultPagination: {
		bootstrapMajorVersion: 3,
		currentPage: 3,
		totalPages: 10,
		size: 'small',
		alignment: 'right',
		itemTexts: function (type, page, current) {
            switch (type) {
            case "first":
                return "首页";
            case "prev":
                return "上一页";
            case "next":
                return "下一页";
            case "last":
                return "末页";
            case "page":
                return page;
            }
        },
		onPageChanged: function(e,oldPage,newPage){
			$('#alert-content').text("Current page changed, old: "+oldPage+" new: "+newPage);
		}
	},
	
	selectedIndex: null,

	onSelected: null,

	initial: function(id){
		this.id = id;
		this.itemId = this.alias + id;
		this.pgAlias = this.alias +'pagination-';
		this.paginationId = this.pgAlias + id;
	},

	getId: function(){
		return this.id;
	},

	getItemId: function(){
		return this.itemId;
	},

	getHtml: function(){
		return this._html;
	},

	getWrapDivId: function(){
		return this.wrapAlias + this.id;
	},
	getType: function(){
		return this.type;
	},

	getPaginationId: function(){
		return this.paginationId;
	},

	getHead: function(){
		var me, html, columns;
		me = this;
		html = '';
		columns = me.columns;

		if(columns && columns.length){
			// append the thead tag
			html += '<thead><tr>'

			var i = 0, ln = columns.length;
			for(; i < ln; i++){
				var item = columns[i];
				html += '<th '

				var props = '';
				for(var j in item){
					if(j != 'header'){
						props += (j +'="'+ item[j] +'" ')
					}
				}

				props += (">" +item['header']) 
				html += props
				html += '</th>';
			}
			// append the thead end tag
			html += '</tr></thead>'

			return html;
		}else {
			console.error('Illegal Argument Exception. Grid columns is required. Just setting it like: ');

			return null;
		}
			
	}
		

	
}