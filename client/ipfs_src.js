(function() {

  var http = require('http');
  var ipfsAPI = require('ipfs-api');
  var ipfs = ipfsAPI('localhost', '5001');
  var caption = null;
  var content = null;

  var get = function(hash) {
    var options, request;
    options = {
      host: 'localhost:4001/ipfs/' + hash
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
    $item.append("<p style=\"background-color:#ccc;padding:15px;\">\n  " + (expand(item.text)) + "\n</p> \n<div class=\"content\"></div>\n<p class=\"caption\">Starting...</p>");
    if (caption === null) {
      caption = $item.find(".caption");
    }
    if (content === null) {
      content = $item.find(".content");
    }
    ipfs.cat(item.text, function(err, res) {
    if(err || !res) return console.error(err);

    if(res.readable) {
        // Returned as a stream
        res.pipe(process.stdout);
    } else {
        // Returned as a string
        console.log(res);
        content.html(res);
    }
  });

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
