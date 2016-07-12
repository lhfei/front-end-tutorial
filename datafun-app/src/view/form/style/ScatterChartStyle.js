/**
 * [ScatterChartStyle description]
 */
function ScatterChartStyle(){
	var me = this;

	// override parent method
	this.initial = function(id){
		me.myname = "name==" +id;
		// call parent initial method.
		AbstractStyle.prototype.initial.call(this, id);
	}

	console.log(this.myname)
}

ScatterChartStyle.prototype = {
	alias: 'cloumn-style-',

	/**
	 * 
		<div class="list-group">
			<li class="list-group-item">
				<form id="_form" class="form-horizontal">
					<div class="form-group">
						<label for="_title" class="col-sm-4 control-label">
							<input type="checkbox" checked="true"/> Show Title
						</label>
						<div class="col-sm-8">
							<input id="_title" type="text" name="title" class="form-control" placeholder="Title" />									
						</div>
					</div>
					<div class="form-group">
						<label for="_width" class="col-sm-4 control-label">Width</label>
						<div class="col-sm-8">
							<input id="_width" type="text" name="width" class="form-control"  placeholder="Width">
						</div>
					</div>
					<div class="form-group">
						<label for="_height" class="col-sm-4 control-label">Height</label>
						<div class="col-sm-8">
							<input id="_height" type="text" name="height" class="form-control"  placeholder="Height">
						</div>
					</div>
				</form>
			</li>
			<li class="list-group-item"/>
		</div>
	 */

	create: function(id){
		var me = this;

		if(me.styleOps == null){
			me.initial(id);

			me._html = '<div class="list-group"><li class="list-group-item"><form id="' +this.itemId+ '" class="form-horizontal"><div class="form-group"><label for="' +this.needTitleId+ '" class="col-sm-4 control-label"><input id="' +this.needTitleId+ '" type="checkbox" checked="true" /> Show Title</label><div class="col-sm-8"><input id="' +this.titleId+ '" type="text" name="title" class="form-control" placeholder="Title" />									</div></div><div class="form-group"><label for="' +this.widthId+ '" class="col-sm-4 control-label">Width</label><div class="col-sm-8"><input id="' +this.widthId+ '" type="text" name="width" class="form-control"  placeholder="Width"></div></div><div class="form-group"><label for="' +this.heightId+ '" class="col-sm-4 control-label">Height</label><div class="col-sm-8"><input id="' +this.heightId+ '" type="text" name="height" class="form-control"  placeholder="Height"></div></div></form></li><li class="list-group-item"/></div>'; 
			
			$('body').on('click', '#' +me.needTitleId, function(event){
				var isNeed = $(event.target).prop('checked');
				me.styleOps.needTitle = isNeed;

				me.itemChangeHandler(me.styleOps);
			});

			// Title change event
			$('body').on('input', '#' +me.titleId, function(event){
				me.styleOps.title = $(event.target).val();
				me.itemChangeHandler(me.styleOps);
			});

			// Width change event
			$('body').on('input', '#' +me.widthId, function(event){
				me.styleOps.width = $(event.target).val();
				me.itemChangeHandler(me.styleOps);
			});

			// Height change event
			$('body').on('input', '#' +me.heightId, function(event){
				me.styleOps.height = $(event.target).val();
				me.itemChangeHandler(me.styleOps);
			});
		}

		return this;
	},

	

	itemChangeHandler: null,

	resizeHandler: null
}


jQuery.extend(true, ScatterChartStyle, AbstractStyle);
  