const express = require('express')
const pug = require('pug')

const host = '127.0.0.1'
const port = 3000

const app = express()

app.set('view engine', 'pug')

app.use(express.static('../../node_modules/'))

app.get('/', (req, res) => {
	res.render('index', { title: 'Hey', message: 'Hello there!'});
})

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`)
})