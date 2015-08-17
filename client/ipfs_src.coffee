io = require('socket.io-client')
socket = null 
caption = null

initSocket = () ->
  console.log 'initSocket'
  socket = io('ws://localhost:3001')
  socket.on('connect', socketConnected)
  socket.on('disconnect', socketDisconnected);
  socket.on('cmd', socketCmdReceived); 

socketConnected = () ->
  console.log 'socketConnected'
  pingServer()

socketDisconnected = () ->
  console.log 'socketDisconnected'
  socket = null

socketCmdReceived = (data) ->
  console.log 'socketCmdReceived ' + data['name'] 
  if data['name'] == 'ack' and data['cmd'] == 'ping'
    status 'Ping acknoledged'

pingServer = () ->
  status 'Pingin...'
  initSocket if !socket
  socket.emit('cmd', {'name':'ping'}) 

status = (statusText) ->
  if caption != null
    console.log statusText
    caption.text(statusText)

expand = (text)->
  text
    .replace /&/g, '&amp;'
    .replace /</g, '&lt;'
    .replace />/g, '&gt;'
    .replace /\*(.+?)\*/g, '<i>$1</i>'

emit = ($item, item) ->
  $item.append """
                 <p style="background-color:#ccc;padding:15px;">
                   #{expand item.text}
                 </p> 
                 <p class="caption">Starting...</p>
               """

  if caption == null
    caption = $item.find(".caption")

  if socket == null
    initSocket() 

bind = ($item, item) ->
  $item.dblclick -> wiki.textEditor $item, item 

window.plugins.ipfs = {emit, bind} if window?
module.exports = {expand,emit} if module?

