# build time tests for ipfs plugin
# see http://mochajs.org/

ipfs = require '../client/ipfs'
expect = require 'expect.js'

describe 'ipfs plugin', ->

  describe 'expand', ->

    it 'can make itallic', ->
      result = ipfs.expand 'hello *world*'
      expect(result).to.be 'hello <i>world</i>'
