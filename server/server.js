(function() {
  var app, doCommand, http, io, io_port, startServer;

  app = require('express')();

  http = require('http').Server(app);

  io = require('socket.io')(http);

  io_port = '3001';

  app.get('/', function(req, res) {
    return res.send('<h1>Hello world</h1>');
  });

  http.listen(io_port, function() {
    return console.log('Opening socket connection on port ' + io_port + ' to receive data from client');
  });

  doCommand = function(param) {
    if (param['name'] === 'ping') {
      return io.emit('cmd', {
        'name': 'ack',
        'cmd': 'ping'
      });
    }
  };

  startServer = function(params) {
    var k, v;
    console.log('ipfs startServer', (function() {
      var _results;
      _results = [];
      for (k in params) {
        v = params[k];
        _results.push(k);
      }
      return _results;
    })());
    return io.on('connection', function(socket) {
      console.log('socket connection established');
      socket.on('disconnect', function() {
        console.log('socket connection disconnected');
        return socket = null;
      });
      return socket.on('cmd', function(param) {
        console.log('command received ' + param['name']);
        return doCommand(param);
      });
    });
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      startServer: startServer
    };
  }

}).call(this);

//# sourceMappingURL=server.js.map
