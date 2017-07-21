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
const sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});
let News = newsModel("briefs", sequelize);
// User.belongsToMany(News,{through: userNews("briefs"), as: "Briefs" });
// News.belongsToMany(News,{through: userNews("briefs"), as: "Briefs" });
setupJoin();
route.post('/like', (req, res) => {

    let thisRating = req.body;
    console.log("LOG" + req.body.news_msid);
    let table = selectTable(req.body.news_msid);
    console.log(table);
    News.sync();

    console.log(User.associations);
    console.log(News.associations);
    User.findOne({
        where: {facebook_user_id: thisRating.user_id}
    }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id}
            }).then(function (news) {
                // here with the help of closure user will be available in inner function
                let foo = "add" + table;
                user[foo](news, {through: {rating: 1}});
                res.send({success: true})
            }).catch(err=>{
                res.send({success: false})
                throw err;
            })
        }).catch(err => {
        res.send({success: false});
        throw err;
    })

});

route.post('/dislike', (req, res) => {
    let thisRating = req.body;
    console.log("LOG" + req.body.news_msid);
    let table = selectTable(req.body.news_msid);
    console.log(table);
    News.sync();

    console.log(User.associations);
    console.log(News.associations);
    User.findOne({
        where: {facebook_user_id: thisRating.user_id}
    }).then(function (user) {

        News.findOne({
            where: {id: thisRating.news_id}
        }).then(function (news) {
            // here with the help of closure user will be available in inner function
            let foo = "add" + table;
            user[foo](news, {through: {rating: 0}});
            res.send({success: true})
        }).catch(err=>{
            res.send({success: false})
            throw err;
        })
    }).catch(err => {
        res.send({success: false});
        throw err;
    })
});

module.exports = route;



function selectTable(news_id){
    switch(news_id){
        case msid.briefs.id:
            console.log("briefs")
            return msid.briefs.table.charAt(0).toUpperCase()  + msid.briefs.table.slice(1);
        case msid.topNews.id:
            return msid.topNews.table;
        case msid.india.id:
            return msid.india.table;
        case msid.world.id:
            return msid.world.table;
        case msid.sports.id:
            return msid.sports.table;
        case msid.cricket.id:
            return msid.cricket.table;
        case msid.business.id:
            return msid.business.table;
        case msid.education.id:
            return msid.education.table;
        case msid.environment.id:
            return msid.environment.table;
        case msid.entertainment.id:
            return msid.entertainment.table;
        case msid.tvFeatured.id:
            return msid.tvFeatured.table;
        case msid.autoFeatured.id:
            return msid.autoFeatured.table;
        case msid.Events.id:
            return msid.Events.table;
        case msid.lifeStyle.id:
            return msid.lifeStyle.table;
        case msid.goodGovernance.id:
            return msid.goodGovernance.table;
    }
}

function setupJoin(){
    for(let key in msid){
        User.belongsToMany(News,{through: userNews(msid[key].table), as: msid[key].table });
        News.belongsToMany(News,{through: userNews(msid[key]), as: msid[key].table });
    }
}