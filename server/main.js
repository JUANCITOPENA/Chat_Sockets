var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [{
    id: 1,
    text: "HOLA",
    author: "JUANCITO"
}];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("😁-Hola Juancito !😀");
});

io.on("connection", function (socket) {
  console.log("Alquien se ha conectado al Servidor");
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
   messages.push(data);

   io.sockets.emit("messages", messages);


  });
});

server.listen(8080, function () {
  console.log("Servidor Corriendo en http://localhost:8080");
});
