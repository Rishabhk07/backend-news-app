/**
 * Created by rishabhkhanna on 03/08/17.
 */
const express = require('express');
const route = express.Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});

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


route.get('/', (req, res) => {
    console.log("requested to the server");
});
io.on('connection', (socket) => {
    console.log("Socket evoked")
    socket.on('new_message', function (msg) {
        let json = JSON.parse(msg)
        console.log(json.msid)
        console.log(json.news_id);
        console.log(getTableName(json.msid))
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});


module.exports = route;

http.listen('9999', () => {
    console.log("Socket server started at 9999")
})
