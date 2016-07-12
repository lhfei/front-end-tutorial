const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mysql = require('mysql')

const host = '127.0.0.1'
const port = 3000

var app = express();
var records;

app.use(express.static('views'));
app.use(express.static('../node_modules'))

app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lhfei',
    database: 'data_view'
});

connection.connect();

connection.query('SELECT * from t_score limit 2050, 10', (err, rows, fields) => {
    if (!err) {
        records = rows;
    } else {
        console.log('Error while performing Query.');
    }
});

// load all
app.get("/api/users", (req, res) => {
    res.send(records);
});

// get
app.get("/api/users/:_id", (req, res) => {
    console.log(`Query ID [${req.params._id}]`)
    connection.query('SELECT * from t_score where id = '+req.params._id, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('Error while performing Query.');
        }
    });  


});

// create
app.post("/api/users", (req, res) => {
    var user = req.body;
    if (user._id) user._id = mongodb.ObjectID(user._id);
    records.save(user, () => {
        res.send("insert or update");
    });
});

// delete
app.delete("/api/users?id=*", function(req, res) {
    users.remove({ ID: mongodb.ObjectID(req.params._id) }, () => {
        res.send("delete");
    });
});

// start server
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})
