const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000

var json = ''
const server = http.createServer( (req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')

	fs.readFile('../http/dashboard.json', (error, data) => {
		if(error){
			console.log(`Error: ${error}`)
		}else 
			json = data.toString()
	})

	res.end(json +'\n');
})


server.listen(port, hostname, () => {
	console.log(`Server running at ${hostname}:${port}`)
});