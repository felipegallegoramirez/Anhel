const app = require("./app");
const session = require("../src/controllers/session.controller");
const sec = require("../src/controllers/sec.controller")

require("./database");

/*
ws=require("ws");
const io = new ws.WebSocketServer({ port: 8010 });
*/

/*
! Estructura mensajes
* Unir
? datos: idtemp

* Mensaje 
? datos: idreceptor
?        mensaje
?        idsession
?        idtemp
?        fecha

* Video 
? datos: idreceptor
?        data
?        idtemp

*/

/*
io.on("connection", (socket) => {
  // send a message to the client
  console.log("conectado")
  // receive a message from the client

  socket.on("join", (data) => {
    const a = JSON.parse(data);
    console.log("join to: ",a)
    socket.join(a);
  });


  socket.on("message", (data) => {
    const packet = JSON.parse(data);
    if (packet.type=="text"){
      console.log("exitoso")
    }
    else if (packet.type=="a"){
      
      console.log("a")
      io.send(packet.idreceptor).emit(packet.information);
      const b={
        message: packet.message,
        sender:packet.idpropio,
        date:packet.fecha
      }
      session.addmensaje(packet.idsession,b);
    }




  });

  socket.on("image", (data) => {
    const packet = JSON.parse(data);
    io.to(packet.id).emit(packet.information);
  });

});
*/
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const req = require("express/lib/request");

require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:3000']
    }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("join", async (data) => {
    const a = JSON.parse(data);
    b= await sec.activeId(a.id)
    if (b!=null){
    socket.join(b.iduser);
  }
  });

  socket.on("message",async (data) => {      
  const packet = JSON.parse(data);
  var a=await sec.message(packet)
  if (a!=null){
    io.to(a).emit("message",packet);
  }else (
    console.log("error")
  )
});

  socket.on('joinR', async (data) => {
  console.log(data)
  const roomName = await sec.receptor(data.temp,data.idsesion);
  io.to(roomName).emit('call', data)
})

socket.on('mirame', async (data) => {
  console.log(data)
  const roomName = await sec.receptor(data.temp,data.idsesion);
  io.to(roomName).emit('miras', data)
})

});


const { ExpressPeerServer } = require('peer');
const { CONNECTING } = require("ws");
const { receptor } = require("../src/controllers/sec.controller");
const peerServer = ExpressPeerServer(server, {
  debug: true,
  port: 3000, path: '/myapp'
});

peerServer.on('connection', (client) => { 
 });
 
app.use('/peerjs', peerServer);



server.listen(3000, () => {
  console.log('listening on *:3000');
});