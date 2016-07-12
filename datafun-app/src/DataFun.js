/**
 * DataFun Javascript.
 *
 * The Global variables's definitions as below:
 *
 * $j = DataFun
 *
 * $c = ColumnChart
 * 
 * 
 * @type
 */
var DataFun = {};
DataFun.prototype = {
	version: '0.1.0',

	required: function(libs){
		if(libs && libs.length > 0){
			for(var i = 0, ln = libs.length; i < ln; i++){
				/*jQuery.getScript(libs[i])
				  .done(function(script, textStatus) {
				    console.log(textStatus);
				    console.log("Load was performed.");
				  })
				  .fail(function(jqxhr, settings, exception) {
				    jQuery("div.log").text("Triggered ajaxError handler.");
				});*/

				// DOM: Create the script element
			    var script = document.createElement("script");
			    // set the type attribute
			    script.type = "text/javascript";
			    // make the script element load file
			    script.src = libs[i];
			    // finally insert the element to the body element in order to load the script
			    document.body.appendChild(script);
			}
		}
	},

	createElement: function(tagName){
		return document.createElement(tagName);
	}
};

$j = DataFun;