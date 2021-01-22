const express = require('express')
const app = express()
const path = require('path')
//sets
app.set('port', 3000)

app.use(express.static(path.join(__dirname,"public")))

//initilize server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})

const SocketIO =require('socket.io')
const io = SocketIO(server)

//web sockets
io.on('connection', () => {
    console.log("Hola, se ha conectaod alguien")
}) 