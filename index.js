
//Inicializacion de variables de entorno para las conexiones
const express = require('express')
const app = express()
const server = require('http').createServer(app);
// Debido a la version 3 de socket.io hay que especificar los origenes
const io = require('socket.io')(server, {
  cors: {
    origins: '*'
  }
});
var fs = require('fs');
//Conexion a la base de datos
// const db = require('./public/database')
// const jugadores = require('./public/jugador_sch')
let ids = 15
let salas = {
  
}

let carro = {
  id : 'agg',
  posX : 617,
  posY : 401,
  height : 20,
  width : 20,
  vector : {x: 0, y:1},
  velocidad : 18,
  initX : 617,
  initY : 401,
  fila : 21,
  col : 33,
  initF : 21,
  initC : 33,
  velR : 1, 
  socket : 0
}


let inicio = true
//console.log("hola",doMat(10))

let pista1 = {
  ancho : 37,
  alto : 37,
  matriz : []
}
pista1 = leer()

//console.log(pista1.matriz)
//guardar(pista1)


io.on('connection', (socket) => {
    
    console.log("hi")
    

    socket.on('save',(data) => {
      socket.emit('save',pista1.matriz)
    })

    socket.on('disconnect', ()=>{
      
      console.log(socket.id)
      console.log("cliente desconectado")
    })
    socket.on('move', data => {
      
      let valor1= carro.fila + carro.vector.y * carro.velR 
      let valor2 = carro.col + carro.vector.x * carro.velR 
      let bool1 = valor1 >= 0 && valor1 <37
      let bool2 = valor2 >= 0 && valor1 <37

      if (bool1 && bool2 && inicio  && pista1.matriz[valor1][valor2] != 0){
        console.log("valida", carro.fila, carro.col)
        carro.posX += carro.velocidad * carro.vector.x
        carro.posY += carro.velocidad * carro.vector.y
        carro.fila += carro.vector.y * carro.velR
        carro.col += carro.vector.x * carro.velR
        if (pista1.matriz[carro.fila][carro.col] == -1){
          socket.emit('pto', "estas en la meta")
        }
        else{
          pista1.matriz[carro.fila][carro.col] = 5
        }
        io.emit('move', {posx: carro.posX, posy: carro.posY, id: carro.id})
        console.log('Valid')
      }
      else{
        console.log(valor1, valor2)
        console.log(carro.fila, carro.col)
        console.log('Invalid')
        
      }
      
    })
    socket.on('turn', data =>{
      carro.vector.x = data.x
      carro.vector.y = data.y
      console.log('gira',carro.vector)
    })
    
})

app.use(express.static('public'))

server.listen(3000, () => {
    console.log('Server is listening in port 3000')
})


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function doMat(ancho, alto){
  var mat = []
  for(let i = 0; i < alto; i += 1){
    var row = []
    for(let j = 0; j < ancho; j += 1){
      row.push(0)
    }
    mat.push(row)
  }
  return mat
}

function guardar(jsonData){

 
  let data = JSON.stringify(jsonData, null, 2);

  fs.writeFile('pista1.p.json', data, (err) => {
      if (err) throw err;
      console.log('Data written to file');
  });

  console.log('This is after the write call');
}

function leer(){
  let rawdata = fs.readFileSync('pista1.p.json');
  let jsonData = JSON.parse(rawdata);
  return jsonData
}



