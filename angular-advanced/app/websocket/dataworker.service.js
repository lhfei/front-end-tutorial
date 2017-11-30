/**
 * [if description]
 * @param  {[type]} typeof module        ! [description]
 * @return {[type]}        [description]
 * @apiVersion 1.0.0
 * @author Hefei Li
 */
'use strick';
(function() {
    var worker = angular.module('xdata.exp.dataworker', ['xdata.exp.baseUrl', 'ngWebSocket']);

    //dataworker.$inject = ['BaseUrlSrv'];

    worker.factory('DataWorker', function (BaseUrlSrv, $websocket) {
        return {
            /**
             * load callback function.
             * @param  {[type]} loadHandler [description]
             * @return {[type]}             [description]
             */
            load: function(loadHandler) {
                var url = BaseUrlSrv.getWebsocketUrl();

                var ws = $websocket('ws://localhost:8181/exp/standard');

                ws.onMessage(function(event) {
                    console.log('message: ', event);
                    var res;
                    try {
                        res = JSON.parse(event.data);
                    } catch (e) {
                        res = {
                            'username' : 'anonymous',
                            'message' : event.data
                        };
                    }

                    loadHandler(res);
                });

                ws.onError(function(event) {
                    console.log('connection Error', event);
                });

                ws.onClose(function(event) {
                    console.log('connection closed', event);
                });

                ws.onOpen(function() {
                    console.log('connection open');
                    ws.send('Hello World');
                    ws.send('again');
                    ws.send('and again');
                });

            }
        };
    });

})();
