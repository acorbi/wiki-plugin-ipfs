# build time tests for ipfs plugin
# see http://mochajs.org/

# server = require '../server/server'
# client = require '../client/ipfs'
expect = require 'expect.js'

describe 'ipfs plugin', ->

  describe 'expand', ->
    
    it '[Client] can establish connection to server via sockets', ->
      expect(true) 
    
    it '[Client] can tell the server to store a file on ipfs', ->
      expect(true)    
    
    it '[Server] can be pinged', ->      
      expect(true) 
      
    it '[Server] can initialize ipfs-api', ->      
      expect(true)        
      
    it '[Server] can call the ipfs-api can add a resource', ->
      expect(true)      

    it '[Server] can call the ipfs-api can ls a resource', ->
      expect(true)   
      
    it '[Server] can call the ipfs-api can get a resource', ->
      expect(true)     