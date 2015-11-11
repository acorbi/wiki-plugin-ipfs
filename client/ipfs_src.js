(function() {

  var io = require('socket.io-client');
  var http = require('http');
  var socket = null;
  var caption = null;
  var content = null;

  var initSocket = function() {
    console.log('[CLIENT]  initSocket');
    socket = io('ws://localhost:3001');
    socket.on('connect', socketConnected);
    socket.on('disconnect', socketDisconnected);
    return socket.on('cmd', socketCmdReceived);
  };

  var socketConnected = function() {
    console.log('socketConnected');
    return pingServer();
  };

  var socketDisconnected = function() {
    console.log('socketDisconnected');
    return socket = null;
  };

  var socketCmdReceived = function(data) {
    if (data['name'] === 'ack' && data['cmd'] === 'ping') {
      return status('[CLIENT] Ping acknoledged');
    } else if (data['name'] === 'ack' && data['cmd'] === 'add') {
      return status('[CLIENT] Add acknoledged');
    } else if (data['name'] === 'ack' && data['cmd'] === 'cat') {
      status('[CLIENT] Cat acknoledged');
      return content.html(data['data']);
    }
  };

  var pingServer = function() {
    status('[CLIENT] Pinging...');
    if (!socket) {
      initSocket;
    }
    return socket.emit('cmd', {
      'name': 'ping'
    });
  };

  var ipfsCat = function(hash) {
    status('[CLIENT] Running ipfsCat with hash ' + hash + '...');
    if (!socket) {
      initSocket();
    }
    return socket.emit('cmd', {
      'name': 'cat',
      'hash': hash
    });
  };

  var ipfsAdd = function(asset) {
    status('[CLIENT] Running ipfsAdd with asset ' + asset + '...');
    if (!socket) {
      initSocket();
    }
    return socket.emit('cmd', {
      'name': 'add',
      'asset': asset
    });
  };

  var get = function(item) {
    var options, request;
    options = {
      host: 'https://www.google.com'
    };
    request = http.get(options, function() {
      return function(res) {
        console.log(res);
        var data;
        data = '';
        res.on('data', chunk(function() {
          return data += chunk;
        }));
        return res.on('end', function() {
          console.log(data);
          return data;
        });
      };
    });
    return request.end;
  };

  var status = function(statusText) {
    if (caption !== null) {
      console.log(statusText);
      return caption.text(statusText);
    }
  };

  var expand = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*(.+?)\*/g, '<i>$1</i>');
  };

  var emit = function($item, item) {
    // var content = get("https://ipfs.io/ipfs/" + item.text);
    // console.log(content);
    // $item.append("<p style=\"background-color:#ccc;padding:15px;\">\n  " + (expand(item.text)) + "\n  expand content\n</p>\n<div class=\"content\"></div>\n<p class=\"caption\">Starting...</p>");
    // if (caption === null) {
    //   caption = $item.find(".caption");
    // }
    // if (content === null) {
    //   content = $item.find(".content");
    // }
    if (socket === null) {
      return initSocket();
    }
    ipfsCat(item.text);
  };

  var bind = function($item, item) {
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
