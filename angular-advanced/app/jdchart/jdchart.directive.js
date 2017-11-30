jdchart.directive('jdchart', [function ($compile) {
	return {
		restrict: 'E',
		template: '<div></div>',
		scope: {
			id: '@',
			width: '=',
			options: '=',
			onClick: '&'
		},
		link: function (scope, element, attrs, ctrl, transcludeFn) {
			var me = this;
			var chart = Highcharts.chart(element[0], scope.options);
			// element.bind('click', function(event) {
			// 	scope.$apply(function(){
			// 		alert(1)
			// 	})
			// });

			element.on('click', function(event) {
				event.preventDefault();
				scope.onClick(chart);
			});
		},
		controller: function() {

		}
	};
}])