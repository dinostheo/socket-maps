var express = require("express");
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });

//port = process.env.PORT || 3000;
//server.listen(port);
server.listen(3000);

var redis = require("redis"),
        redisClient = redis.createClient();

app.get('/', function (req, res) {
  	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('moveme', function(data) {
        console.log(data);
      	redisClient.srandmember("locations", function(error, reply){
            io.sockets.emit("moveme", reply.toString());
        });
    });

    socket.on("markerPlaced", function(location){
        console.log(location);
        socket.broadcast.emit('markerPlaced', location);
    });

    socket.on('disconnect', function() {
      // handle disconnect
    });
});