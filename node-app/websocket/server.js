var server = require('websocket').server, 
    http = require('http');

var socket = new server({
    httpServer: http.createServer().listen(5337)
});

socket.on('request', (request) => {
    var connection = request.accept(null, request.origin);

    connection.on('message', (message) => {
        //console.log(message.utf8Data);
        connection.sendUTF('Hello, '+message.utf8Data);
        setTimeout(() => {
            connection.sendUTF('this is a websocket example');
        }, 1000);
    });

    connection.on('close', (connection) => {
        console.log('connection closed');
    });
}); 