/**
 *
 * 
 */
const http = require('http');
const fs = require('fs');
const formidable = require('formidable')
const util = require('util')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    if(req.method.toLowerCase() === 'get'){
        displayForm(res);
    }else if(req.method.toLowerCase() === 'post' && req.url === '/process'){
        //processAllFieldsOfTheForm(req, res);
        processFormFieldsIndividual(req, res);
    }
});

/**
 * [displayForm description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function displayForm(res) {
    fs.readFile('public/index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

/**
 * [processAllFieldsOfTheForm description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}

/**
 * [processFormFieldsIndividual description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
}
server.listen(port, hostname, () => {
    console.log(`Server runnint at http:// ${hostname}:${port}`);
});
