(function() {

  var config = require('../lib/config.js');
  var http = require('http');
  var ipfsAPI = require('ipfs-api');
  var ipfs = ipfsAPI(config().ipfsHost, config().ipfsPort);
  var contentDiv = null;

  var expand = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*(.+?)\*/g, '<i>$1</i>');
  };

  var displayContent = function(content){
    contentDiv.html(content);
  };

  var emit = function($item, item) {
    $item.html("<div class=\"content\">"+ (expand(item.text)) +"</div>");
    contentDiv = $item.find(".content");

    ipfs.cat(item.text, function(err, res) {
      if (err || !res) return console.error(err);

      if (res.readable) {
        res.pipe(process.stdout);
      } else {
        displayContent(res);
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
