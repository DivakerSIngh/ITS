var config = require('./config/config')

var express = require("express");
var app = express();
var http = require('http');
var routes = require('./route/route');
global.domain = require("../webapi/comman/domain");
var mongoose = require('mongoose');
global.crypto = require('crypto');
global.commonModule = require("./comman/common");
global.responseCode = require("./comman/responseCode");
global.config = require('./config/config');
global.uuid = require('uuid');


//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//to all cors request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin,auth-token,  X-Requested-With, Content-Type, Accept");
     console.log('--------------------------------request Details----------------------------------------', req.originalUrl);
     console.log('auth-token', req.headers['auth-token']);
     console.log('user-agent', req.headers['user-agent']);
     console.log('-----------------------------------------ENDS------------------------------------------');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(config.database, { useMongoClient: true });
var db = mongoose.connection;

app.use('/api', routes);


var server = http.createServer(app);
var io = require('socket.io')(server);
console.log("io me aaaya");

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat_message', function(msg){
        console.log('message: ' + msg);
      });
  });
 
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