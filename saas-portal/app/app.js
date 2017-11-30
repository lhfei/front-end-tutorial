const PORT   = 80;
const TARGET = 'http://localhost:60011/';

var util  = require('util'),
colors    = require('colors'),
http      = require('http'),
httpProxy = require('http-proxy'),
jsonFile  = require('jsonfile');

var options = {
	'crm.com': 'http://localhost:60011',
	'predict.com': 'http://localhost:60012'
}

var dirFile = 'assets/data/dirs.json'
var dirs = {}
dirs.contain = (dir) => {
    console.log(`${dir}`)
    var dispatcher = {isExist: false};
    var apps = dirs.apps;
    for(var i = 0, len = apps.length; i < len; i++){
        var app = apps[i];
        var paths = apps[i].paths;

        for(var j = 0, lnth = paths.length; j < lnth; j++){
            if(dir === app.root + paths[j].url){
                dispatcher.isExist = true;
                dispatcher.realPath = app.app + app.root + dir;
                break;
            }
        }
    }
    return dispatcher;
}

jsonFile.readFile(dirFile, (err, obj) => {
    dirs.dirs = obj;
    dirs.apps = obj.dirs;
});



var proxy = new httpProxy.createProxyServer();

http.createServer(function(req, res) {
    var realPath = req.url;
    var dispatcher = dirs.contain(realPath)
    if(dispatcher.isExist){
        proxy.web(req, res, {
            target: dispatcher.realPath
        });
    }else {
        proxy.web(req, res, {
            target: 'www.bing.com'
        });
    }
    
}).listen(PORT);

console.log('http server '.blue + 'started '.green.bold + 'on port: '.blue +PORT+ ' '.yellow + 'with proxy.web() handler'.cyan.underline + ' and latency'.magenta);
console.log('http server '.blue + 'started '.green.bold + 'on port '.blue +TARGET+  ''.yellow);