// const express = require('express')
// const app = express()
// const path = require('path')
// //sets
// app.set('port', 3000)

// app.use(express.static(path.join(__dirname,"public")))

// //initilize server
// const server = app.listen(app.get('port'), () => {
//     console.log('server on port', app.get('port'))
// })

// const SocketIO =require('socket.io')
// const io = SocketIO(server)

// //web sockets
// io.on('connection', (socket) => {
//     console.log("Hola, se ha conectado alguien")
//     socket.emit('test event', 'some data')
// }) 
const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origins: '*'
  }
});

let salas = [
  [
    {posx: 100, posy:70},
    {posx: 100, posy:70},
    {posx: 100, posy:70}
  ],
  [
    {posx: 100, posy:70},
    {posx: 100, posy:70},
    {posx: 100, posy:70}
  ],
  [
    {posx: 100, posy:70},
    {posx: 100, posy:70},
    {posx: 100, posy:70}
  ]
]

io.on('connection', (socket) => {
    console.log('un cliente se ha conectado')
    console.log("ID:", socket.id)
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });    
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', `server: ${msg}`);
    });
    socket.on('nickname: ', (msg) => {
      console.log("El cliente ha enviado su nombre XD", msg)
    } )

    socket.on('move', (data) => {
      console.log("Estos son los datos recibidos",data)
      salas[data.sala][data.jugador].posx += data.posx
      salas[data.sala][data.jugador].posy += data.posy
      
      console.log("esta son las salas",salas)
      let datos = {
        posx1: salas[0][0].posx,
        posy1: salas[0][0].posy,
        posx2: salas[1][0].posx,
        posy2: salas[1][0].posy,
        posx3: salas[2][0].posx,
        posy3: salas[2][0].posy,
      }
      io.emit('pocisiones', datos)
    })

    socket.on('init', (num) =>{
      let datos = {
        posx1: salas[0][0].posx,
        posy1: salas[0][0].posy,
        posx2: salas[1][0].posx,
        posy2: salas[1][0].posy,
        posx3: salas[2][0].posx,
        posy3: salas[2][0].posy,
      }
      io.emit('pocisiones', datos)
    })

})

server.listen(3000, () => {
    console.log('Server is listening in port 3000')
})
