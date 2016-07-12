function BasicGrid(options) {
	if(options){
		for(var i in options){
			this[i] = options[i]
		}
	}
};

BasicGrid.prototype = {

	/**
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 *
			<div class="table-responsive">

				<table id="grid" class="table table-condensed table-hover table-striped " data-selection="true" data-multi-select="true" data-row-select="true" data-keep-selection="true">
	                <thead>
	                    <tr>
	                        <th data-column-id="id" data-identifier="true" data-type="numeric" data-align="right" data-width="40">ID</th>
	                        <th data-column-id="sender" data-order="asc" data-align="center" data-header-align="center" data-width="75%">Sender</th>
	                        <th data-column-id="received" data-css-class="cell" data-header-css-class="column" data-filterable="true">Received</th>
	                        <th data-column-id="link" data-formatter="link" data-sortable="false" data-width="75px">Link</th>
	                        <th data-column-id="status" data-type="numeric" data-visible="false">Status</th>
	                        <th data-column-id="hidden" data-visible="false" data-visible-in-selection="false">Hidden</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr>
	                        <td>1</td>
	                        <td>me@rafaelstaib.com</td>
	                        <td>11.12.2014</td>
	                        <td>Link</td>
	                        <td>999</td>
	                        <td>Hidden value 1</td>
	                    </tr>
	                </tbody>
	            </table>
				
				<ul id="grid-paginator"></ul>
				
			</div>
	 * 
	 */
	create: function(id){
		var me, head;

		me = this;
		me.initial(id);

		head = me.getHead();
		if(head){
			me._html = '<div class="table-responsive"><table id="' +this.getItemId()+ '" class="table table-condensed table-hover table-striped " data-selection="true" data-multi-select="true" data-row-select="true" data-keep-selection="true">'

			me._html += head;

			me._html += '</table><ul id="' +this.getPaginationId()+ '"/></div>'
			return me;
		}else {
			return head;
		}


	}
};



jQuery.extend(true, BasicGrid, AbstractGrid);