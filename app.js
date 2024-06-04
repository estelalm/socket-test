//parte do servidor

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


// quando ocorre o evento de conexão manda a mensagem de user conectado e de desconexão o mesmo

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//pega a mensagem emitida lá no html
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


// emitir o evento pra todos os sockets conectados
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 



// //emite pra todos menos o que mandou 
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });