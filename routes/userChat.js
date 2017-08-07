/**
 * Created by rishabhkhanna on 03/08/17.
 */
const express = require('express');
const route = express.Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Sequelize = require('sequelize');
const chatTable = require('../models/userChats');
const bodyParser = require('body-parser');
const sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});
app.use(bodyParser.urlencoded({extended: false}));
function getTableName(msid) {
    switch (msid) {
        case "48986328":
            return "briefs";
        case "51396865":
            return "top_news";
        case "4440100":
            return "india";
        case "296589292":
            return "world";
        case "4719148":
            return "sports";
        case "4719161":
            return "cricket";
        case "1898055":
            return "business";
        case "913168846":
            return "education";
        case "2647163":
            return "environment";
        case "1081479906":
            return "entertainment";
        case "47553118":
            return "tv";
        case "49896634":
            return "automotive";
        case "2277129":
            return "events";
        case "2886704":
            return "life_style";
        case "47082088":
            return "good_governance";
        default:
            return "not matched"
    }

}

io.on('connection', (socket) => {
    console.log("Socket evoked")

    socket.on('join_room',function (msg) {
        let chatRoom  = JSON.parse(msg);
        socket.join(chatRoom.news_id);
        console.log("user joined room " + chatRoom.news_id )
        console.log("socket id : " + socket.id);
    });

    socket.on('leave_group',function (msg) {
        let chatRoom = JSON.parse(msg)
        socket.leave(chatRoom.news_id,function () {
            console.log("banda has left the group ")

        });
        console.log("user leaved the group " + chatRoom.news_id)
        console.log("socket id " + socket.id);
    })

    socket.on('new_message', function (msg) {
        console.log("socket id : " + socket.id)
        let json = JSON.parse(msg);
        // socket.join(json.news_id);
        let news_table = getTableName(json.msid)
        console.log(getTableName(json.msid))
        let Chats = chatTable(news_table);
        Chats.build({
            message: json.message,
            news_type:news_table,
            msid: json.msid,
            news_id: json.news_id,
            from: json.user_id
        }).save().then(function (response) {
            console.log("saved the user chat successfully")
            console.log(response)
            console.log("Socket id to return : " + socket.id);
            console.log(io.sockets.adapter.rooms[json.news_id]);
            io.sockets.in(json.news_id).emit('from_server',response )
        })
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});

app.post('/getChats',(req,res)=>{
    console.log("request at getChats newsId: ");
    console.log(req.body.news_id)
    console.log("msid: ")
    console.log(req.body.msid);
    let newsTableName = getTableName(req.body.msid);

    let Chats = chatTable(newsTableName);
    Chats.findAll({
        where: {news_id: req.body.news_id},
        limit: 10
    }).then(function (response) {
        res.send(response)
    }).catch(function (err){
        res.send({success: false})
    })
});
module.exports = route;

http.listen('9999', () => {
    console.log("Socket server started at 9999")
})
