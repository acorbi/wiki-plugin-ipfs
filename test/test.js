(function() {

  var config = require('../lib/config.js');
  var expect = require('expect.js');
  var ipfsAPI = require('ipfs-api');

  describe('ipfs plugin', function() {

    describe('Config', function() {

      it('is set', function() {
        expect(config().ipfsHost).to.exist;
        expect(config().ipfsPort).to.exist;
      });

    });

    describe('ipfsAPI', function() {

      it('can be initialized', function() {
        var ipfs = ipfsAPI(config().ipfsHost, config().ipfsPort);
        expect(ipfs).to.exist;
      });

    });

  });

}).call(this);
