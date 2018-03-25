var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var baseUrl = 'https://systembevakningsagenten.se/'

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) { //serve html
    res.setHeader('Content-Type', 'text/html');
    res.sendfile(__dirname + '/index.html');
});
app.get('/test', function (req, res) { //serve html
    res.send('testing');
});


app.get('/newBeers', function (req, res) { //serve json
    var url = baseUrl + 'api/json/2.0/newProducts.json';
    requestAsync(url).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
})

app.get('/storeInventory', function (req, res) { //serve json
    var queryParams = req && req.query;
    var storeId = queryParams.storeId ? queryParams.storeId : 983;

    var url = baseUrl + `api/json/1.0/inventoryForStore.json?id=${storeId}`;
    requestAsync(url).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
})

app.get('/findStoresByCoordinates', function (req, res) { //serve json

    var queryParams = req && req.query;
    if (!queryParams || !queryParams.lat || !queryParams.lng) {
        res.status(400).send('Error. API expects params. Example: ?lat=1.22&lng=3.223');
        return;
    }
    const {lat, lng}  = queryParams;

    // var lng = '18.015704';
    // var lat = '59.333498';
    var url = baseUrl + `api/json/1.0/searchStore.json?lat=${lat}&lng=${lng}&limit=5`;
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
console.log('Running server on port ' + port);
exports = module.exports = app;