'use strict';

(function () {
	var chartSrv = angular.module('xdata.jdchart.service', []);
	
	chartSrv.factory('jdchartService', ['$q', '$window', jdchartService]);

	//IE8 support
	function indexOf(arr, find, i /*opt*/) {
		if (i === undefined)
			i = 0;
		if (i < 0)
			i += arr.length;
		if (i < 0)
			i = 0;
		for (var n = arr.length; i < n; i++)
			if (i in arr && arr[i] === find)
				return i;
		return -1;
	}

	function prependMethod(obj, method, func) {
		var original = obj[method];
		obj[method] = function () {
			var args = Array.prototype.slice.call(arguments);
			func.apply(this, args);
			if (original) {
				return original.apply(this, args);
			} else {
				return;
			}

		};
	}

	function deepExtend(destination, source) {
		//Slightly strange behaviour in edge cases (e.g. passing in non objects)
		//But does the job for current use cases.
		if (angular.isArray(source)) {
			destination = angular.isArray(destination) ? destination : [];
			for (var i = 0; i < source.length; i++) {
				destination[i] = deepExtend(destination[i] || {}, source[i]);
			}
		} else if (angular.isObject(source)) {
			destination = angular.isObject(destination) ? destination : {};
			for (var property in source) {
				destination[property] = deepExtend(destination[property] || {}, source[property]);
			}
		} else {
			destination = source;
		}
		return destination;
	}

	function jdchartService($q, $window) {
		var highchartsProm = $q.when($window.Highcharts);

		function getHighchartsOnce() {
			return highchartsProm;
		}

		return {
			indexOf: indexOf,
			prependMethod: prependMethod,
			deepExtend: deepExtend,
			getHighcharts : getHighchartsOnce,
			ready : function ready(callback, thisArg) {
				getHighchartsOnce().then(function () {
					callback.call(thisArg);
				});
			}
		};
	}

})();