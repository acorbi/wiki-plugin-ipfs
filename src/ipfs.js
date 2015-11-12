(function() {

  var config = require('../lib/config.js');
  var http = require('http');
  var ipfsAPI = require('ipfs-api');
  var ipfs = ipfsAPI(config().ipfsHost, config().ipfsPort);
  var caption = null;
  var content = null;

  var expand = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*(.+?)\*/g, '<i>$1</i>');
  };

  var emit = function($item, item) {
    console.log("emit");
    $item.append("<p style=\"background-color:#ccc;padding:15px;\">\n  " + (expand(item.text)) + "\n</p> \n<div class=\"content\"></div>\n");
    if (content === null) {
      content = $item.find(".content");
    }
    ipfs.cat(item.text, function(err, res) {
      if (err || !res) return console.error(err);

      if (res.readable) {
        res.pipe(process.stdout);
      } else {
        content.html(res);
      }
    });

  };

  var bind = function($item, item) {
    console.log("bind");
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
