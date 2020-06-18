const path=require('path');
const express=require('express');
const http=require('http');
const socketio=require('socket.io');
var siofu = require("socketio-file-upload");


const app=express();
const server=http.createServer(app);
const io=socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(siofu.router);

//Run when client connects
io.on('connection',socket=>{
    
   //Welcome current user
    socket.emit('message','Welcome to chatapp');


    //Broadcast when a user connect
    socket.broadcast.emit('message', 'A user has joined the chat');

    //runs when client disconnect

    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });


    //listen for chatmessage
    socket.on('chatMessage',(msg)=>{
        io.emit('message',msg);
    });
})


const PORT=3000 || process.env.PORT;

server.listen(PORT,()=> console.log(`server running on port ${PORT}`));