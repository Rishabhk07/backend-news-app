const  express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chatTable = require('./models/userChats');
const newsModel = require('./models/NewsModel');
const seq = require('./models/sequelizeConnection');

let serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

function requestNewsJson(msid) {

}

var port = process.env.PORT || 9890;
app.use(bodyParser.urlencoded({extended:false}));
app.use('/' , express.static(__dirname + "/public"));

const routes = {
    news: require('./routes/newsApiTest'),
    sequelize : require('./routes/newsApiRoutes'),
    auth : require('./routes/userAuth'),
    rate: require('./routes/rateNews'),
    notification: require('./routes/notification'),
    chats: require('./routes/userChat')
};

app.use('/news' , routes.news);

app.use('/test', routes.sequelize);

app.use('/auth',routes.auth);

app.use('/rate',routes.rate);

app.use('/notification',routes.notification)

app.use('/chat',routes.chats.route)

// Socket IO here

io.on('connection', (socket) => {
    console.log("Socket evoked")
    setTimeout(sendHearbeat,2500);
    socket.on('pong',function (msg) {
        console.log(msg)
    })

    function sendHearbeat() {
        setTimeout(sendHearbeat, 2500);
        io.sockets.emit('ping', { beat : 1 });
    }

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
        console.log(msg);
        // socket.join(json.news_id);
        let news_table = routes.chats.getTableName(json.msid)

        console.log(routes.chats.getTableName(json.msid))
        console.log(msg)
        let Chats = chatTable(news_table);
        Chats.build({
            message: json.message,
            news_type:news_table,
            msid: json.msid,
            news_id: json.news_id,
            from: json.from,
            anonym: json.anonym
        }).save().then(function (response) {
            console.log("saved the user chat successfully")
            console.log(response)
            console.log("Socket id to return : " + socket.id);
            console.log(io.sockets.adapter.rooms[json.news_id]);
            io.sockets.in(json.news_id).emit('from_server',response )
            let NewsTable = newsModel(news_table, seq.db);
            NewsTable.findOne({
                where:{id: json.news_id}
            }).then(function (news) {
                news.increment('chats',{by: 1})
            }).catch(function (err) {
                console.log(err)
                console.log("cannot increment chat message");
            })

        })
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});
//end

http.listen(9890 , ()=> {
    console.log("magic happens at " + port);
});


