var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var tpbUrl = 'https://systembevakningsagenten.se/api/json/2.0/newProducts.json'
var baseUrl = tpbUrl

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) { //serve html
    // res.setHeader('Content-Type', 'text/html');
    res.sendfile(__dirname + '/home.html');
});
app.get('/test', function (req, res) { //serve html
    res.send('testing');
});


app.get('/search', function (req, res) { //serve json
    var url = baseUrl;
    requestAsync(url).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });

})

function requestAsync(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (err, response, body) {
            if (err)
                return reject(err);
            try {
                console.log(response.statusCode);
                resolve(body);
            } catch (e) {
                reject(e);
            }
        });
    });
}

var port = process.env.PORT || 8081;
app.listen(port);
console.log('Running search-server on port ' + port);
exports = module.exports = app;