/**
 * Created by rishabhkhanna on 14/09/17.
 */
const express = require('express');
const route = express.Router();
const newsCategory = require('../msid/newsMsid');
const requestNews = require('../FetchLibrary/requestNews');

route.get('/cronAllNews',function (req,res) {
    for (let key in newsCategory){
        let count = 0;
        requestNews.fetchNews(newsCategory[key],function (body) {
            console.log("done")
        })
    }
    res.send({success: true})
});

module.exports = route;