const express = require('express')

const host = '127.0.0.1'
const port = 3000

const app = express()
const router = express.Router()

app.use(express.static('../../node_modules'))
app.use(express.static('public'))

var doLog = (req, res, next) => {
	console.log('logged ...')
	next()
}

var requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// Application-level middleware
app.use(doLog)
app.use(requestTime)

app.get('/appMid', (req, res) => {
	var responseText = 'Hello World!<br>';
	responseText += '<small>Requested at: ' + req.requestTime + '</small>';

	responseText += '<script type="text/javascript">(function(){alert(123)})()</script>'
	res.send(responseText);
})

// Router-level middleware
// a middleware function with no mount path. This code is executed for every request to the router
var innerLog = function (req, res, next) {
  console.log('Time:', Date.now());
  next();
}

router.use(innerLog);
router.get('/routeMid', (req, res) => {
	res.end('special');
})


app.use('/', router)

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`)
})