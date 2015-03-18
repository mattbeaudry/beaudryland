// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;
var mapdata = '';

io.on('connection', function (socket) {

  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;

    console.log('numUsers:'+numUsers);

    //first user?
    if(numUsers == 0){
      console.log("first user, call setupgame");
      socket.emit('setup game');
    } else {
      console.log("not first user");
      //socket.emit('update map'); 
    }

    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers,
      usernames: usernames
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
      usernames: usernames
    });
  });








  // first user joins, setup game and map
  socket.on('setup game', function () {
    socket.broadcast.emit('setup game', {
      
    });
  });

  // when a user joins they need to receive the current map
  socket.on('update map', function (data) {

    console.log("updating map data on server and in client socket");
    socket.mapdata = data;
    mapdata = data;

    socket.broadcast.emit('update map', {
      mapdata: data
    });

  });

  socket.on('save mapdata', function (data) {
    console.log('save mapdata on server..');
    mapdata = data;
  });

  socket.on('load mapdata', function () {
    console.log('load mapdata from server');
    socket.emit('load mapdata', {
      mapdata: mapdata
    });
  });

  /*
  socket.on("moveplayer", function(position) {
      io.sockets.emit("moveplayer", {sender: socket.nick, position: position});
  });
  */


  // when the client emits 'typing', we broadcast it to others
  socket.on('moveplayer', function (position) {
    console.log('broadcast move player');
    io.sockets.emit('moveplayer', {
      sender: socket.username, 
      position: position
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers,
        usernames: usernames
      });
    }
  });
});
