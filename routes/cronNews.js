/**
 * Created by rishabhkhanna on 14/09/17.
 */
const express = require('express');
const route = express.Router();
const newsCategory = require('../msid/newsMsid');
const requestNews = require('../FetchLibrary/requestNews');

route.get('/cronAllNews',function (req,res) {
    for (let key in newsCategory){
        console.log(newsCategory[key]);
        requestNews.fetchNews(newsCategory[key],function (body) {
            res.send({success: true})
        })
    }
});

module.exports = route;