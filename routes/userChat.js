/**
 * Created by rishabhkhanna on 03/08/17.
 */
const express = require('express');
const route = express.Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chatTable = require('../models/userChats');
const bodyParser = require('body-parser');
const newsModel = require('../models/NewsModel');
const seq = require('../models/sequelizeConnection');

// app.use(bodyParser.urlencoded({extended: false}));
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

route.post('/getChats',(req,res)=>{
    console.log("request at getChats newsId: ");
    console.log(req.body.news_id)
    console.log("msid: ")
    console.log(req.body.msid);
    let newsTableName = getTableName(req.body.msid);

    let Chats = chatTable(newsTableName);
    Chats.findAll({
        where: {news_id: req.body.news_id},
        limit: 10,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function (response) {
        res.send(response.reverse())
    }).catch(function (err){
        res.send({success: false})
    })
});


module.exports = {route,getTableName};

// http.listen('9999', () => {
//     console.log("Socket server started at 9999")
// });
