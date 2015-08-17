app = require('express')()
http = require('http').Server(app)
io = require('socket.io')(http)
io_port = '3001'

app.get '/', (req, res) ->
  res.send('<h1>Hello world</h1>')

http.listen io_port, () ->
  console.log 'Opening socket connection on port ' + io_port + ' to receive data from client'

doCommand = (param) ->
  if param['name'] == 'ping'
    io.emit('cmd',{'name':'ack','cmd':'ping'}) 

startServer = (params)->
  console.log 'ipfs startServer', (k for k,v of params)

  io.on 'connection', (socket) ->
    console.log 'socket connection established'
    socket.on 'disconnect', () ->
      console.log 'socket connection disconnected'
      socket = null
    socket.on 'cmd', (param) ->
      console.log 'command received ' + param['name']
      doCommand(param)

module.exports = {startServer} if module?

