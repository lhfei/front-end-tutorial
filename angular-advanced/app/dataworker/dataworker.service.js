/**
 * [if description]
 * @param  {[type]} typeof module        ! [description]
 * @return {[type]}        [description]
 * @apiVersion 1.0.0
 * @author Hefei Li
 */
'use strick';
(function() {
    var worker = angular.module('xdata.exp.dataworker', ['xdata.exp.baseUrl']);

    //dataworker.$inject = ['BaseUrlSrv'];

    worker.factory('DataWorker', function (BaseUrlSrv) {
        return {
            /**
             * load callback function.
             * @param  {[type]} loadHandler [description]
             * @return {[type]}             [description]
             */
            load: function(loadHandler) {
                var url = BaseUrlSrv.getWebsocketUrl();
                console.log('log == ', url)
                loadHandler(url);
            }
        };
    });

})();
