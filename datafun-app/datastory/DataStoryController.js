/*DataFun.required([
    '../../js/jquery.js',
    '../../bootstrap/js/bootstrap.js',
    '../../js/highcharts.src.js',   
    '../../js/modules/exporting.js',
    '../src/util/ID.js',
    '../src/locale/editer-lang-zh_CN.js',
    '../src/form/TextEditer.js',
    '../src/form/FilteEditer.js',
    '../src/chart/ColumnChart.js'
]);*/
/**
 * Dashboard Controller
 * 
 */

/*
 * 
 */
$(function(){
    enableOrDisableBtn(true);

    // create edit panel
    $j.utils.initEditPanel();

    // create configuration panel    
    $j.utils.createConfiPanel();

    // enable configuration panel 
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });	

    $j.utils.enableDragDdrop();
});



function enableOrDisableBtn(isEnable){
    $('#methods [type=button]').each(function(){
        if(isEnable){
            $(this).removeAttr('disabled')
        }else {
            if($(this)[0].textContent === 'Draw Chart'){
                $(this).removeAttr('disabled')
            }else{
                $(this).attr('disabled', 'disabled')   
            }               
        }
    })
};

$j.utils = {
    chart: null,
    editPanel: null,
    confPanel: null,

    initEditPanel: function(){
        var me = this;
        if(!me.editPanel){
            me.getEditPanel();
        };
    },
    createConfiPanel: function(){
        var me, panel;

        me = this;
        panel = new ConfigurePanel({
            id: ID(),
            complete: function(panel){
                console.log('configurepanel create completed...');
            },
            // refresh data
            loadData: function(){
                var fielters = [];
                me.addseries();
            },

            onChanges: [{
                id: 'ds-schema',
                handler: function(panel, option){
                    var view = me.editPanel.getSelected();
                    me.confPanel.bindDatasource2View(view);
                }
            },{
                id: 'ds-table',
                handler: function(panel, option){
                    var view = me.editPanel.getSelected();
                    me.confPanel.bindDatasource2View(view);
                }
            },{
                id: 'ds-dimension',
                handler: function(panel, option){alert('333')}
            },{
                id: 'ds-measure',
                handler: function(panel, option){alert('444')}
            }]
        });

        this.confPanel = panel.create();
        $('#east-container').append(this.confPanel.getHtml());

        this.confPanel.launch();
    },

    drawChart: function(type, polar){
        var me, chartOps, jdchart;

        me = this;

        jdchart = new JDChart();

        chartOps = jdchart.create(type, ID(), polar);

        // added the chart to the edit-panel
        me.editPanel.addChart(chartOps);
        me.chart = $('#' +chartOps.chart.renderTo).highcharts();

        // attached onSelected event listener to the chart
        me.chart.onSelected = function(chart){
            me.chart = chart; 

            me.confPanel.initStylePanel(me.chart);
            
            if(me.chart.stylePanel){
                me.chart.stylePanel.itemChangeHandler = function(options){
                    if(options.needTitle){
                        me.chart.setTitle({
                            text: options.title
                        });
                    }else{
                        me.chart.setTitle({
                            text: ''
                        });
                    }
                    me.chart.resize(options);
                }
                console.log('Chart[' +me.chart.getId()+ '] was be selected ...');
            }
        };

        me.confPanel.loadData();
    },
    addseries: function(){
        var me, chart;
        me = this;
        chart = me.chart;

        if (chart.series.length) {
            chart.series[0].remove();
        }
        chart.addSeries({
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        })
    },

    setWidth: function(width){
        this.chart.setWidth(width)
    },

    moveTo: function(targetId){
        var chart = this.chart;
        $('#'+chart.getId()).children().each(function(){
            $('#'+targetId).append($(this));
        }); 
    },

    setTitle: function(title){
        this.chart.setTitle({
            text: title
        })
    },

    getTextEditor: function(){
    	var me,
            id,
    		html,
    		te,
            schema, 
            table;

        me = this;
    	id = ID();
    	te = new TextEditor();
    	
    	// get the text-editer 
    	te.create(id);
        
        // attached onSelected event listener to the chart
    	te.onSelected = function(o){
            console.log('TextEditor [' +te.getId()+ '] was be selected ...');           
            schema = me.confPanel.getSchemaCombo().val();
            table = me.confPanel.getTableCombo().val();

            if(!(te.store.schema === schema && te.store.table === table && te.store.editer === id)){   
            /*if(true){ */      
                var fields = [], rules = [];
                var response  = DatasourceStore.getFields(table, te.xtype);
                if(response.success){
                    fields = response.data;
                    rules = DatasourceStore.getRules(te.xtype).data;

                    te.adapterCombobox(te.getColNameId(), fields);
                    te.adapterCombobox(te.getColRuleId(), rules);
                }

                /*te.store.editer = id;
                te.store.schema = schema;
                te.store.table = table;*/

                te.initStore({editer: id, schema: schema, table: table});

                te.isWraped = true;
            }
        }

    	//$('#new-container').append(te.getHtml())
       this.editPanel.addFilter(te);
    },


    getEditPanel: function(){
        var panel = new EditPanel();

        this.editPanel = panel;

        var div = panel.create(ID());

        $('#center-container').append($(div))
    },

    createGrid: function(){
        var me, grid;
        me = this;
        grid = new BasicGrid({
            pagination: true,
            columns: [
                {header: '姓名', dataIndex: 'name',        flex: 1, align: 'center', hidden: false},
                {header: '编号', dataIndex: 'stu_num',     flex: 2, align: 'center'},
                {header: '数学', dataIndex: 'score_math',  flex: 2, align: 'center'},
                {header: '语文', dataIndex: 'score_zh',    flex: 2, align: 'center'},
                {header: '英语', dataIndex: 'score_en',    flex: 2, align: 'center'},
                {header: '学年', dataIndex: 'create_time', flex: 2, align: 'center'},
                {header: '学期', dataIndex: 'latest_time', flex: 1, align: 'center', hidden: true}     
            ]
        });

        grid = grid.create(ID());

        this.editPanel.addGrid(grid);
        
    },

    enableDragDdrop: function() {
        var me = this;
        var right = me.editPanel.itemId;

        var charts = ["chart-grid", "chart-line", "chart-column", "chart-pie", "chart-scatter", "chart-funnel", "chart-gauge", "chart-polar"];
        for(var i = 0, ln = charts.length; i < ln; i++){
            
            dragula([document.getElementById(charts[i]), document.getElementById(right)], {
                isContainer: function (el) {
                    return false; // only elements in drake.containers will be taken into account
                },
                moves: function (el, source, handle, sibling) {
                    return true; // elements are always draggable by default
                },
                accepts: function (el, target, source, sibling) {
                    return true; // elements can be dropped in any of the `containers` by default
                },
                invalid: function (el, handle) {
                    return false; // don't prevent any drags from initiating by default
                },
                direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
                copy: true,                       // elements are moved by default, not copied
                copySortSource: false,             // elements in copy-source containers can be reordered
                revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
                removeOnSpill: false,              // spilling will `.remove` the element, if this is true
                mirrorContainer: document.body,    // set the element that gets mirror elements appended
                ignoreInputTextSelection: true     // allows users to select input text, see details below
            }).on('cancel', function(el) {
                var a = 'A';
                this.canceled = true;
            }).on('drop', function(el, target, source, sibling) {
                var a = this;
                console.log(a.canceled)
                if(target){
                    $(el).dblclick();
                }
            }).on('drag', function(el, container, source){
                
            });

        }


        //dragula([document.getElementById(right), document.getElementById(right)])   
    }
}