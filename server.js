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

app.get('/', function (req, res) {
  	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.on('message', function(data) {
      	socket.broadcast.send(data);
    });

    socket.on('disconnect', function() {
      // handle disconnect
    });
});
