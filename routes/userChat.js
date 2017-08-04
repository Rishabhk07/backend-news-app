/**
 * Created by rishabhkhanna on 03/08/17.
 */
const express = require('express');
const route = express.Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

    route.get('/',(req,res)=>{
        console.log("requested to the server");
    });
    io.on('connection',(socket)=>{
        console.log("Socket evoked")
        socket.on('disconnect')
    })

module.exports = route;

http.listen('9999',()=>{
    console.log("Socket server started at 9999")
})
