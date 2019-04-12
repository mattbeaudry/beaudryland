$(function() {

  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize varibles
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box

  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "There's 1 participant";
    } else {
      message += "There are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Sets the client's username
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Log a message
  function log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // drawMap if not first user
  function drawMap (data) {
    alert("DRAW MAP");
  }

  function listUsers (usernames) {
    // Display the list of connected users on the page
    var usernameshtml = '';
    $.each(usernames, function(i, user) {
        usernameshtml += '<li>'+user+'</li>';
        //createPlayerDiv(user);
    });
    $('.user-list ul').html(usernameshtml);
  }

  function listPlayers (usernames) {
    // Display the list of connected users on the page
    var usernameshtml = '';
    $.each(usernames, function(i, user) {
        usernameshtml += '<div class="player player-'+user+' the-fucking-player"></div>';
    });
    $('.the-players').html(usernameshtml);

    // Draw Player characters
    $.each(usernames, function(i, user) {
        $('.player-'+user).css("top","0px");
        $('.player-'+user).css("left","0px");
        var color = getUsernameColor(user);
        $('.player-'+user).css("backgroundColor",color);
    });
  }

  function movePlayer(direction) {
                  
    var currentPosX = $('.player-'+username).css('left');
    var currentPosY = $('.player-'+username).css('top');

    if (direction == "right" || direction == "left") {

      currentPosX = stripPX(currentPosX);
      if (direction == "right") {
        currentPosX = currentPosX + 20;
      } else {
        currentPosX = currentPosX - 20; 
      }
      currentPosX = addPX(currentPosX);
      //$('.player-'+username).css('left',currentPosX);
      
    } else if (direction == "up" || direction == "down") {

      currentPosY = stripPX(currentPosY); 
      if (direction == "down") {
        currentPosY = currentPosY + 20; 
      } else {
        currentPosY = currentPosY - 20; 
      }
      currentPosY = addPX(currentPosY);
      //$('.player-'+username).css('top',currentPosY);
      
    }
    
    var position = new Array();
    position[0] = currentPosX;
    position[1] = currentPosY;
    position[2] = username;
    position[3] = direction;

    //var jsonposition = JSON.stringify(position);
    socket.emit("moveplayer", position);

  }

  function changePlayerDirection(username, direction) {

    trace("changing player-"+username+" direction to "+direction);

    //animated items
    var playergraphic;
    /*
    if ( selecteditem == "sword" ){ 
      playergraphic = "-"+selecteditem;
    } else {
      playergraphic = "";
    }
    */

    playergraphic = "";

    //clear direction and animation classes
    $('.player-'+username).removeClass("player-direction-down player-direction-left player-direction-right player-direction-up");
    //$('.player-'+username).removeClass("player-direction-down"+playergraphic+" "+"player-direction-left"+playergraphic+ " "+player-direction-right"+playergraphic+" "+username+"-direction-up"+playergraphic);

    switch (direction) {
      case "up":
        $('.player-'+username).addClass("player-direction-up");
        //if (playergraphic!="") { $('.player-'+username).addClass("player-direction-up"+playergraphic); }
        break;
      case "down":
        $('.player-'+username).addClass("player-direction-down");
        //if (playergraphic!="") { $('.player-'+username).addClass("player-direction-down"+playergraphic); }
        break;
      case "left":
        $('.player-'+username).addClass("player-direction-left");
       // if (playergraphic!="") { $('.player-'+username).addClass("player-direction-left"+playergraphic); }
        break;
      case "right":
        $('.player-'+username).addClass("player-direction-right");
        //if (playergraphic!="") { $('.player-'+username).addClass("player-direction-right"+playergraphic); }
        break;
    }

  }

  // Whenever the server emits moveplayer, move that player */
  socket.on("moveplayer", function(position) {

    var playername = position.position[2];
    var playerclass = ".player-"+playername;
    var playerleft = position.position[0];
    var playertop = position.position[1];
    var direction = position.position[3];

   // // console.log("Move "+playername+": "+playerleft+playertop);

    changePlayerDirection(playername,direction);
    $(playerclass).css('left',playerleft);
    $(playerclass).css('top',playertop);
    
  });


  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Beaudryland Multiplayer. WARNING: This is a rough demo in the works. ";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);

    if (data.numUsers === 1) {
     // // console.log('I am the first user so I create the map, and dont need to receive map');
    } else {
     // // console.log('I am NOT the first user so the map already exists, and I only need to receive map');
      //alert("test is mapdata exists:"+socket.mapdata);
      socket.emit('load mapdata');
    }

    listUsers(data.usernames);
    listPlayers(data.usernames);

  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' joined');
    listUsers(data.usernames);
    listPlayers(data.usernames);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left');
    removeChatTyping(data);
    listUsers(data.usernames);
    listPlayers(data.usernames);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });

  //setup game: load new map, save map data to server
  socket.on('setup game', function (){

   // // console.log("SETUP DA GAME EMIT");
    loadNewMap();

    var mapdata = $('.the-fucking-map').html();
    socket.emit('save mapdata', mapdata);

    /*
    socket.on('update map', function (data) {
      mapdata: mapdata
    });
    */

  });

  socket.on('load mapdata', function (data) {
    //addChatMessage(data);
   // // console.log("Load DA MAP");
    //alert('LOAD MAP==='+data.mapdata);
    $('.the-fucking-map').append(data.mapdata);
  });

  //update map
  socket.on('update map', function (data){
   // // console.log("UPDATE DA MAP");
   // // console.log('socketdata:'+socket.mapdata);
   // // console.log('mapdata:'+data.mapdata);
    //drawMap(data.mapdata);
  });
                                
  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37: /* LEFT ARROW */
        movePlayer("left");
        break;
      case 38: /* UP ARROW */
        movePlayer("up");
        break;
      case 39: /* RIGHT ARROW */
        movePlayer("right");
        break;
      case 40: /* DOWN ARROW */
        movePlayer("down");
        break;
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });


});










