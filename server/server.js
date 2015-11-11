(function() {
  var app, doCommand, http, io, io_port, ipfs, ipfsAdd, ipfsApi, ipfsCat, ipfs_endpoint, ipfs_port, startServer;

  app = require('express')();
  http = require('http').Server(app);
  io = require('socket.io')(http);
  io_port = '3001';
  ipfs = null;
  ipfsApi = require('ipfs-api');
  ipfs_endpoint = '127.0.0.1';
  ipfs_port = '5001';

  http.listen(io_port, function() {
    return console.log('[SERVER] Opening socket connection on port ' + io_port + ' to receive data from client');
  });

  doCommand = function(param) {
    if (param['name'] === 'ping') {
      return io.emit('cmd', {
        'name': 'ack',
        'cmd': 'ping'
      });
    } else if (param['name'] === 'cat') {
      return ipfsCat(param['hash']);
    } else if (param['name'] === 'add') {
      return ipfsAdd(param['file']);
    }
  };

  ipfsAdd = function(file, cb) {
    console.log('[SERVER] ipfsAdd ' + file.name);
    return io.emit('cmd', {
      'name': 'ack',
      'cmd': 'add'
    });
  };

  ipfsCat = function(hash) {
    console.log('[SERVER] ipfsCat ' + hash);
    return ipfs.cat(hash, function(err, res) {
      var body, data;
      data = new ArrayBuffer(100);
      if (err || !res) {
        return console.error(err);
      } else {
        if (res.readable) {
          body = '';
          res.on('data', function(chunk) {
            return body += chunk;
          });
          return res.on('end', function() {
            return io.emit('cmd', {
              'name': 'ack',
              'cmd': 'cat',
              'data': body
            });
          });
        }
      }
    });
  };

  startServer = function(params) {
    var k, v;
    console.log('[SERVER] ipfs startServer', (function() {
      var _results;
      _results = [];
      for (k in params) {
        v = params[k];
        _results.push(k);
      }
      return _results;
    })());
    ipfs = ipfsApi(ipfs_endpoint, ipfs_port);
    console.log('[SERVER] Initializing IpFs api on ' + ipfs_endpoint + ':' + ipfs_port + ' ' + ipfs);
    return io.on('connection', function(socket) {
      console.log('[SERVER] socket connection established');
      socket.on('disconnect', function() {
        console.log('[SERVER] socket connection disconnected');
        return socket = null;
      });
      return socket.on('cmd', function(param) {
        console.log('[SERVER] command received ' + param['name']);
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
