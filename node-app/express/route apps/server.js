/**
 * 
 */
const express = require('express')

//
const host = '127.0.0.1'
const port = 3000

const app = express()

// static files
app.use(express.static('public'))
app.use(express.static('../../node_modules/'));

//
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
	console.log(req)
})

// Route parameters
app.get('/users/:userId/:region', (req, res) => {
	res.send(req.params)
})

// Route handlers
function nextHandler1(req, res, next) {
	console.log(`nextHandler1 executed. `)
	next();
}

function nextHandler2(req, res, next) {
	console.log(`nextHandler2 executed. `)
	next();
}

app.get('/testHandler', [nextHandler1, nextHandler2], (req, res) => {
	res.end('Hello\n')
})

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`)
})