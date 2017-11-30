/**
 * [if description]
 * @param  {[type]} typeof module        ! [description]
 * @return {[type]}        [description]
 * @apiVersion 1.0.0
 * @author Hefei Li
 */
'use strict';
(function() {

    var baseUrl = angular.module('xdata.exp.baseUrl', []);
    baseUrl.factory('BaseUrlSrv', function() {
    	var me = this;
    	var skipTrailingSlash = function(path) {
            return path.replace(/\/$/, '');
        };
        return {
            getPort: function() {
                var port = Number(location.port);
                if (!port) {
                    port = 80;
                    if (location.protocol === 'https:') {
                        port = 443;
                    }
                }
                //Exception for when running locally via grunt
                if (port === 3333 || port === 9000) {
                    port = 8080;
                }
                return port;
            },

            getWebsocketUrl: function() {
                var wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
                return wsProtocol + '//' + location.hostname + ':' + this.getPort() +
                    skipTrailingSlash(location.pathname) + '/ws';
            },

            getRestApiBase: function() {
                return location.protocol + '//' + location.hostname + ':' +
                    this.getPort() + skipTrailingSlash(location.pathname) +
                    '/api';
            }

            
        };

    });

})();
