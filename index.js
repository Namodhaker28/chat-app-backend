
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors=require('cors');
app.use(cors());

const io = new Server(server,{
    cors:{
        origin: 'https://6599042eb11170a6fb48d11c--verdant-mandazi-e70ad1.netlify.app',
    }
});


const port = 4000;

app.get('/', (req, res) => {
res.send("hello world")
});

io.on('connection', (socket) => {
      console.log(`user id : ${socket.id} `);

      socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      })

      socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
      })

      socket.on('disconnect', () =>{
        console.log("User Disconnected", socket.id);
      })
  });

server.listen(app.listen(port,()=>{

    console.log(`listening on port:${port}`)
}))