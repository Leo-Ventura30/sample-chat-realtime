const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require("socket.io")(server);
app.get('/', (req, res) => {
  res.send("Entre na sala com um nome")
});

// io.on('connection', (socket) => {
//   console.log('a user connected', socket);
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
let message = []
let users = []
app.get("/room?:name", (req,res)=>{
  res.sendFile(__dirname + '/main.html');
})

io.on('connection', (socket) => {
  socket.on('connectUser', (user) => {
    users.forEach(userArr=>{
      if(userArr ==user) {console.log("ja existe esse nome")}else{console.log("pode logar")}
    })
    users.push(user)
    socket.broadcast.emit('connectedUser', user)
  });
  socket.on('sendMessage', (msg) => {
    message.push(msg)
    socket.broadcast.emit('receveidMessage', msg)
  });
  console.log(users)

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});