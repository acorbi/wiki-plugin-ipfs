app = require('express')()
http = require('http').Server(app)
io = require('socket.io')(http)
io_port = '3001'
ipfs = null
ipfsApi = require('ipfs-api')
ipfs_endpoint = '127.0.0.1' 
ipfs_port = '5001'

app.get '/', (req, res) ->
  res.send('<h1>Hello world</h1>')

http.listen io_port, () ->
  console.log 'Opening socket connection on port ' + io_port + ' to receive data from client'

doCommand = (param) ->
  if param['name'] == 'ping'
    io.emit('cmd',{'name':'ack','cmd':'ping'}) 
  else if param['name'] == 'cat' 
    ipfsCat(param['hash'])
  else if param['name'] == 'add' 
    ipfsAdd(param['file'])

ipfsAdd = (file, cb) ->
  console.log 'ipfsAdd ' + file.name
  # TODO
  # addfile = { path: file.name, contents: fileStream(file) }
  # addopts = { wrap: true } # wrap with a dir to preserve filename.
  # ipfs.add addfile, addopts, (err, res) ->
  #   return cb(err) if err
  #   unless Array.isArray res
  #     res = [res]
  #   for r in res
  #     console.log('added', r.Hash, r.Name)
  #   cb(null, res)
  io.emit('cmd',{'name':'ack','cmd':'add'})

ipfsCat = (hash) ->
  console.log 'ipfsCat ' + hash 
  ipfs.cat hash, (err,res) ->
    data = new ArrayBuffer(100);
    if err or !res 
      console.error(err)
    else
      if res.readable 
        body = ''
        res.on 'data',(chunk) ->
          body += chunk
        res.on 'end', () ->
          io.emit('cmd',{'name':'ack','cmd':'cat','data':body})

startServer = (params)->
  console.log 'ipfs startServer', (k for k,v of params)

  ipfs = ipfsApi ipfs_endpoint, ipfs_port
  console.log 'Initializing IpFs api on ' + ipfs_endpoint + ':' + ipfs_port + ' ' + ipfs

  io.on 'connection', (socket) ->
    console.log 'socket connection established'
    socket.on 'disconnect', () ->
      console.log 'socket connection disconnected'
      socket = null
    socket.on 'cmd', (param) ->
      console.log 'command received ' + param['name']
      doCommand(param)

module.exports = {startServer} if module?

