/**
 * Created by rishabhkhanna on 06/01/17.
 */
const express = require('express');
const route = express.Router();
const requestToi  = require('../utils/requestNews');
const msid = require('../model/NewsMsid');

//fetch briefs from toi website
route.get('/briefs' , (req , res)=>{

    requestToi.fetchNews(msid.briefs, (body)=>{
        res.send(body);
    })

});

//fetch top stories from toi website
route.get('/top' , (req , res)=>{

    requestToi.fetchNews(msid.topNews, (body)=>{
        res.send(body);
    })

});

//fetch entertainment news
route.get('/entertainment' , (req , res)=>{

    requestToi.fetchNews(msid.entertainment, (body)=>{
        res.send(body);
    })

});

//fetch india news
route.get('/india' , (req , res)=>{

    requestToi.fetchNews(msid.india, (body)=>{
        res.send(body);
    })

});

//fetch world news
route.get('/world' , (req , res)=>{

    requestToi.fetchNews(msid.world, (body)=>{
        res.send(body);
    })

});

//fetch sports
route.get('/sports' , (req , res)=>{

    requestToi.fetchNews(msid.sports, (body)=>{
        res.send(body);
    })

});

//fetch cricket
route.get('/cricket' , (req , res)=>{

    requestToi.fetchNews(msid.cricket, (body)=>{
        res.send(body);
    })

});

module.exports = route;
//