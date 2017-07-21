/**
 * Created by rishabhkhanna on 21/07/17.
 */
const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const newsModel = require('../models/NewsModel');
const Sequelize = require('sequelize');
const userNews = require('../models/userNews');
const msid = require('../msid/newsMsid');


route.post("/:table",(req,res)=>{
    switch(req.params.table){
        case msid.briefs.id:

            break;
        case msid.topNews.id:
            break;
        case msid.india.id:
            break;
        case msid.world.id:
            break;
        case msid.sports.id:
            break;
        case msid.cricket.id:
            break;
        case msid.business.id:
            break;
        case msid.education.id:
            break;
        case msid.environment.id:
            break;
        case msid.entertainment.id:
            break;
        case msid.tvFeatured.id:
            break;
        case msid.autoFeatured.id:
            break;
        case msid.Events.id:
            break;
        case msid.lifeStyle.id:
            break;
        case msid.goodGovernance.id:
            break;
    }
})


function rate() {
    console.log(req.body);
}

    let thisRating = req.body;
    News.sync();

    console.log(User.associations);
    console.log(News.associations);
    User.findOne({
        where: {facebook_user_id: thisRating.user_id}
    }).then(function (user) {
        news_counter++;
        News.findOne({
            where: {id: thisRating.news_id}
        }).then(function (news) {
            // here with the help of closure user will be available in inner function
            user.addBriefs(news, {through: {rating: 1}});
            res.send({success: true})
        }).catch(err=>{
            res.send({success: false})
            throw err;
        })
    }).catch(err => {
        res.send({success: false});
        throw err;
    })

}
