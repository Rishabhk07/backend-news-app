/**
 * Created by rishabhkhanna on 06/01/17.
 */
const express = require('express');
const route = express.Router();
const requestToi  = require('../utils/requestNews');

//fetch briefs from toi website
route.get('/briefs' , (req , res)=>{
    var msid = "48986328";
    requestToi.fetchNews(msid , (body)=>{
        res.send(body);
    })

});

//fetch top stories from toi website
route.get('/top' , (req , res)=>{

});

//fetch trending news from toi website
route.get('/trending' , (req , res)=>{

});

//fetch latest news
route.get('/latest' , (req , res)=>{

});

//fetch entertainment news
route.get('/entertainment' , (req , res)=>{

});

//fetch india news
route.get('/india' , (req , res)=>{

});

//fetch world news
route.get('/world' , (req , res)=>{

});

//fetch sports
route.get('/sports' , (req , res)=>{

});

//fetch cricket
route.get('/cricket' , (req , res)=>{

});

module.exports = route;
//