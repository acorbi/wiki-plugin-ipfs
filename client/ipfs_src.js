(function() {
  var bind, caption, emit, expand, initSocket, io, pingServer, socket, socketCmdReceived, socketConnected, socketDisconnected, status;

  io = require('socket.io-client');

  socket = null;

  caption = null;

  initSocket = function() {
    console.log('initSocket');
    socket = io('ws://localhost:3001');
    socket.on('connect', socketConnected);
    socket.on('disconnect', socketDisconnected);
    return socket.on('cmd', socketCmdReceived);
  };

  socketConnected = function() {
    console.log('socketConnected');
    return pingServer();
  };

  socketDisconnected = function() {
    console.log('socketDisconnected');
    return socket = null;
  };

  socketCmdReceived = function(data) {
    console.log('socketCmdReceived ' + data['name']);
    if (data['name'] === 'ack' && data['cmd'] === 'ping') {
      return status('Ping acknoledged');
    }
  };

  pingServer = function() {
    status('Pingin...');
    if (!socket) {
      initSocket;
    }
    return socket.emit('cmd', {
      'name': 'ping'
    });
  };

  status = function(statusText) {
    if (caption !== null) {
      console.log(statusText);
      return caption.text(statusText);
    }
  };

  expand = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*(.+?)\*/g, '<i>$1</i>');
  };

  emit = function($item, item) {
    $item.append("<p style=\"background-color:#ccc;padding:15px;\">\n  " + (expand(item.text)) + "\n</p> \n<p class=\"caption\">Starting...</p>");
    if (caption === null) {
      caption = $item.find(".caption");
    }
    if (socket === null) {
      return initSocket();
    }
  };

  bind = function($item, item) {
    return $item.dblclick(function() {
      return wiki.textEditor($item, item);
    });
  };

  if (typeof window !== "undefined" && window !== null) {
    window.plugins.ipfs = {
      emit: emit,
      bind: bind
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      expand: expand,
      emit: emit
    };
  }

}).call(this);

//# sourceMappingURL=ipfs_src.js.map
