const fs = require('fs')

fs.readFile('dashboard.json', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
