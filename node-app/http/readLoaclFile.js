const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

var content = ''
fs.readFile('dashboard.json', (err, data) => {
    if (err) return console.error(err);
    content = data.toString();
})

const server = http.createServer((request, response) => {
	response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    response.end(content +'\n')
})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
})
