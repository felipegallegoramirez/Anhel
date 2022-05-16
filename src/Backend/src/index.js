const app = require("./app");
const session = require("../src/controllers/session.controller");

require("./database");
ws=require("ws");
const io = new ws.WebSocketServer({ port: 8010 });

/*
! Estructura mensajes
* Unir
? datos: idpropio

* Mensaje 
? datos: idreceptor
?        mensaje
?        idsession
?        idpropio
?        fecha

* Video 
? datos: idreceptor
?        data


*/



io.on("connection", (socket) => {
  // send a message to the client
  socket.send(JSON.stringify({
    type: "hello from server"
  }));

  // receive a message from the client

  socket.on("join", (data) => {
    const a = JSON.parse(data);
    socket.join(a);
  });


  socket.on("message", (data) => {
    const packet = JSON.parse(data);
    io.to(packet.idreceptor).emit(packet.information);
    const b={
      message: packet.message,
      sender:packet.idpropio,
      date:packet.fecha
    }
    session.addmensaje(packet.idsession,b);
  });

  socket.on("image", (data) => {
    const packet = JSON.parse(data);
    io.to(packet.id).emit(packet.information);
  });

});

// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
  console.log(`Socket on port 8010`);
});