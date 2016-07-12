const express = require('express')
const ejs = require('ejs')

const host = '127.0.0.1'
const port = 3000

const app = express()

// setting template engine
app.engine('.html', ejs.__express);
app.set('view engine', 'ejs');

//app.use(express.static('views'))

app.get('/', (req, res) => {
    var data = {
        header: 'EJS Template',
        message: 'Hello EJS'
    }

    res.render(__dirname + '/views/index.html', data);
})


app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`)
})