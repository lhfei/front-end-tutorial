
DatasourceStore = {
	schemas: jQuery.parseJSON('{"success":true, "data": [{"name": "students-score", "text": "students-score", "value": "students-score"}, {"name": "sales-order", "text": "sales-order", "value": "sales-order"}]}'),
	tables: [{
		name:  'students-score',
		tables: '{"success":true, "data": [{"name": "score", "text": "成绩表", "value": "score"}, {"name": "course", "text": "课程表", "value": "course"}]}'
	},{
		name: 'sales-order',
		tables: '{"success":true, "data": [{"name": "order", "text": "订单表", "value": "order"}, {"name": "salesman", "text": "销售人员表", "value": "salesman"}]}'
	}],

	getDefaultOption: function(){
		return new Option('-- 请选择 --', '-1', '-- 请选择 --');
	},

	fields: [],

	getData: function (){
		var rows = {"data":[{"id":null,"name":null,"stu_num":null,"birthday":null,"sco_math":86.9026,"sco_zh":75.0404,"sco_en":75.8337,"academic_year":"2013-2014","semester":"1"},{"id":null,"name":null,"stu_num":null,"birthday":null,"sco_math":86.9335,"sco_zh":74.7363,"sco_en":76.5558,"academic_year":"2013-2014","semester":"2"},{"id":null,"name":null,"stu_num":null,"birthday":null,"sco_math":87.1021,"sco_zh":75.0974,"sco_en":77.7458,"academic_year":"2014-2015","semester":"1"},{"id":null,"name":null,"stu_num":null,"birthday":null,"sco_math":87.8219,"sco_zh":73.3492,"sco_en":76.8599,"academic_year":"2014-2015","semester":"2"},{"id":null,"name":null,"stu_num":null,"birthday":null,"sco_math":87.0546,"sco_zh":73.5083,"sco_en":77.1805,"academic_year":"2015-2015","semester":"1"},{"id":null,"name":null,"stu_num":null,"birthday":null,"sco_math":86.6366,"sco_zh":74.4561,"sco_en":76.8432,"academic_year":"2015-2015","semester":"2"}],"total":6,"success":true}
		return rows;
	},


	getSchemas: function(){
		return this.schemas;
	},

	getTables: function(schema){
		if(schema === 'students-score'){
			var tables = '{"success":true, "data": [{"name": "score", "text": "成绩表", "value": "score"}, {"name": "course", "text": "课程表", "value": "course"}]}';
			return jQuery.parseJSON(tables);
		}else if(schema === 'sales-order'){
			var sales = '{"success":true, "data": [{"name": "order", "text": "订单表", "value": "order"}, {"name": "salesman", "text": "销售人员表", "value": "salesman"}]}';
			return jQuery.parseJSON(sales);
		}else {
			return jQuery.parseJSON('{"success": false, "message": "选择的数据库不存在"}');
		}
	},
	loadFields: function(table){
		if(table === 'score'){
			var tables = '{"success":true, "data": [{ "name": "STU_NUM", "text": "学生编号", "value": "text" }, { "name": "name", "text": "学生姓名", "value": "text" }, { "name": "ACADEMIC_YEAR", "text": "学年", "value": "datetime" }, { "name": "SEMESTER", "text": "学期", "value": "datatime" }, { "name": "SCO_MATH", "text": "数学成绩", "value": "numeric" }, { "name": "SCO_ZH", "text": "语文成绩", "value": "numeric" }, { "name": "SCO_EN", "text": "英语成绩", "value": "numeric" }]}';
			return jQuery.parseJSON(tables);
		}else if(table === 'course'){
			var sales = '{"success":true, "data": [{ "name": "COURSE_NUM", "text": "课程编号", "value": "text" }, { "name": "COURSE_NAME", "text": "课程名称", "value": "text" }, { "name": "ACADEMIC_YEAR", "datatime": "学年", "value": "datetime" }, { "name": "SEMESTER", "text": "学期", "value": "datatime" } ]}';
			return jQuery.parseJSON(sales);
		}else if(table === 'order'){
			var sales = '{"success":true, "data": [{ "name": "ORDER_NUM", "text": "订单编号", "value": "text" }, { "name": "SALES_NUM", "text": "销售人员", "value": "text" }, { "name": "SALES_AMOUNT", "text": "订单金额", "value": "numeric" }, { "name": "SALES_DATETIME", "text": "销售日期", "value": "datetime" } ]}';
			return jQuery.parseJSON(sales);			
		}else if(table === 'salesman'){
			var sales = '{"success":true, "data": [{ "name": "SALES_NUM", "text": "员工编号", "value": "text" }, { "name": "SALES_NAME", "text": "员工姓名", "value": "text" }, { "name": "SALES_VALUME", "text": "销售业绩", "value": "numeric" } ]}';
			return jQuery.parseJSON(sales);			
		}else {
			return jQuery.parseJSON('{"success": false, "message": "选择的数据库不存在"}');
		}
	},

	getFields: function(table, fieldType){
		var me, response, data;
		me = this;
		data = [];
		response = me.loadFields(table);
		if(fieldType){
			var fields = response.data;
			for(var i = 0, ln = fields.length; i < ln; i++){
				if(fields[i].value === fieldType){
					data.push(fields[i]);
				}
			}
			response.data = data;
		}

		return response;
	},

	getRules: function(fieldType){
		if(fieldType === 'text'){
			var fields = '{"success":true, "data": [{ "name": "LEFT", "text": "开始于", "value": "LEFT" }, { "name": "RIGHT", "text": "结束于", "value": "RIGHT" }, { "name": "ANY", "text": "包含", "value": "ANY" }, { "name": "EXACT", "text": "不包含", "value": "EXACT" }]}';
			return jQuery.parseJSON(fields);
		}else if(fieldType === 'numeric'){
			var fields = '{"success":true, "data": [{ "name": "LE", "text": "小于等于", "value": "LE" }, { "name": "LT", "text": "小于", "value": "LT" }, { "name": "GT", "text": "大于", "value": "GT" }, { "name": "GE", "text": "大于等于", "value": "GE" }, { "name": "EQ", "text": "等于", "value": "EQ" }, { "name": "NE", "text": "不等于", "value": "NE" }, { "name": "BEWTEEN", "text": "在 ... 之间", "value": "BEWTEEN" }]}';
			return jQuery.parseJSON(fields);
		}else if(fieldType === 'datatime'){
			var fields = '{"success":true, "data": [{ "name": "LEFT", "text": "开始于", "value": "LEFT" }, { "name": "RIGHT", "text": "结束于", "value": "RIGHT" }, { "name": "ANY", "text": "包含", "value": "ANY" }, { "name": "EXACT", "text": "不包含", "value": "EXACT" }]}';
			return jQuery.parseJSON(fields);
		}else {
			var fields = '{"success":true, "data": []}';
			return jQuery.parseJSON(fields);
		}
	},


	/*
		{"success": true,
		"total": 38, 
		"data": [
			{"name": "JD-1 ", "stu_num": "001-1 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-2 ", "stu_num": "001-2 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-3 ", "stu_num": "001-3 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-4 ", "stu_num": "001-4 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-5 ", "stu_num": "001-5 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-6 ", "stu_num": "001-6 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-7 ", "stu_num": "001-7 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-8 ", "stu_num": "001-8 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-9 ", "stu_num": "001-9 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-10", "stu_num": "001-10", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-11", "stu_num": "001-11", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-12", "stu_num": "001-12", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-13", "stu_num": "001-13", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-14", "stu_num": "001-14", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-15", "stu_num": "001-15", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-16", "stu_num": "001-16", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-17", "stu_num": "001-17", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-18", "stu_num": "001-18", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-19", "stu_num": "001-19", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-20", "stu_num": "001-20", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-21", "stu_num": "001-21", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-22", "stu_num": "001-22", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-23", "stu_num": "001-23", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-24", "stu_num": "001-24", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-25", "stu_num": "001-25", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-26", "stu_num": "001-26", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-27", "stu_num": "001-27", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-28", "stu_num": "001-28", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-29", "stu_num": "001-29", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-30", "stu_num": "001-30", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-31", "stu_num": "001-31", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-32", "stu_num": "001-32", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-33", "stu_num": "001-33", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-34", "stu_num": "001-34", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-35", "stu_num": "001-35", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-36", "stu_num": "001-36", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-37", "stu_num": "001-37", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"},
			{"name": "JD-38", "stu_num": "001-38", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}
		]
		"message": "ok"
		}
	 */

	getScore: function(start, end){
		var dataStr, json, data, result;
		dataStr = '{"success": true, "total": 38, "data": [ {"name": "JD-1 ", "stu_num": "001-1 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-2 ", "stu_num": "001-2 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-3 ", "stu_num": "001-3 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-4 ", "stu_num": "001-4 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-5 ", "stu_num": "001-5 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-6 ", "stu_num": "001-6 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-7 ", "stu_num": "001-7 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-8 ", "stu_num": "001-8 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-9 ", "stu_num": "001-9 ", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-10", "stu_num": "001-10", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-11", "stu_num": "001-11", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-12", "stu_num": "001-12", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-13", "stu_num": "001-13", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-14", "stu_num": "001-14", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-15", "stu_num": "001-15", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-16", "stu_num": "001-16", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-17", "stu_num": "001-17", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-18", "stu_num": "001-18", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-19", "stu_num": "001-19", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-20", "stu_num": "001-20", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-21", "stu_num": "001-21", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-22", "stu_num": "001-22", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-23", "stu_num": "001-23", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-24", "stu_num": "001-24", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-25", "stu_num": "001-25", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-26", "stu_num": "001-26", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-27", "stu_num": "001-27", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-28", "stu_num": "001-28", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-29", "stu_num": "001-29", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-30", "stu_num": "001-30", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-31", "stu_num": "001-31", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-32", "stu_num": "001-32", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-33", "stu_num": "001-33", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-34", "stu_num": "001-34", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-35", "stu_num": "001-35", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-36", "stu_num": "001-36", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-37", "stu_num": "001-37", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"}, {"name": "JD-38", "stu_num": "001-38", "score_math": 95, "score_en": 92, "score_zh": 99, "academic_year": "2015-2016", "semester": "1"} ] "message": "ok" } '
		data = [], result = [];

		json = jQuery.parseJSON(dataStr);
		data = json.data;

		result = data.slice(parseInt(start) - 1, parseInt(end));

		json.data = result;

		return json;
	}	
}

