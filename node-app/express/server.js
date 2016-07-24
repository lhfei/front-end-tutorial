/**
 * Simple Server
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000
var json = ''

const app = express()

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// serve static files
app.use(express.static('../node_modules/'));
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * read file
 * @param  {[type]} '../http/dashboard.json' [description]
 * @param  {[type]} (error,                  data          [description]
 * @return {[type]}                          [description]
 */
fs.readFile('../http/dashboard.json', (error, data) => {
    if (error) {
        console.log(`Error: [${error}]`)
    } else {
        json = data.toString()
    }
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + "/" + "index.html");
})

// This responds with "Hello World" on the homepage
app.get('/getDashboard', (req, res) => {
    res.send(json + '\n');
})

// This responds a POST request for the homepage
app.post('/create', urlencodedParser, (req, res) => {
    response = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', (req, res) => {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', (req, res) => {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', (req, res) => {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

var server = app.listen(port, hostname, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`Server running at http://${host}:${port}`)
})
