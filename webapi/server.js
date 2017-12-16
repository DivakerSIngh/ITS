var config = require('./config/config')

var express = require("express");
var app = express();
var http = require('http');
var routes = require('./route/route');
var mongoose = require('mongoose');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//to all cors request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(config.database, { useMongoClient: true });
var db = mongoose.connection;

app.use('/api', routes);


var server = http.createServer(app);
server.listen(config.port || 5656, function() {
    db.on('error', console.error.bind(console, 'connected error'));
    db.on('open', function() {
        console.log('connected');
    });

    var port = server.address().port;
    console.log(config.port);
    console.log("App now running on port", "localhost://" + port);
});

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
})