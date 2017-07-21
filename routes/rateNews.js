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
let NewsAssociation = {};
setupJoin();
console.log("YO Calling from inside");

route.post('/like', (req, res) => {

    let thisRating = req.body;
    console.log("LOG" + req.body.news_msid);
    let table = selectTable(req.body.news_msid);
    console.log(table);
    let News = NewsAssociation[req.body.news_msid];
    console.log(NewsAssociation[req.body.news_msid])

    // console.log(User.associations);
    // console.log(News.associations);
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
        }).catch(err => {
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
    let News = NewsAssociation[req.body.news_msid];
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
        }).catch(err => {
            res.send({success: false})
            throw err;
        })
    }).catch(err => {
        res.send({success: false});
        throw err;
    })
});

module.exports = route;


function selectTable(news_id) {
    switch (news_id) {
        case msid.briefs.id:
            console.log("briefs")
            return msid.briefs.table.charAt(0).toUpperCase() + msid.briefs.table.slice(1);
        case msid.topNews.id:
            return msid.topNews.table.charAt(0).toUpperCase()  + msid.topNews.table.slice(1);
        case msid.india.id:
            return msid.india.table.charAt(0).toUpperCase()  + msid.india.table.slice(1);
        case msid.world.id:
            return msid.world.table.charAt(0).toUpperCase()   + msid.world.table.slice(1);
        case msid.sports.id:
            return msid.sports.table.charAt(0).toUpperCase()   + msid.sports.table.slice(1);
        case msid.cricket.id:
            return msid.cricket.table.charAt(0).toUpperCase()   + msid.cricket.table.slice(1);
        case msid.business.id:
            return msid.business.table.charAt(0).toUpperCase()   + msid.business.table.slice(1);
        case msid.education.id:
            return msid.education.table.charAt(0).toUpperCase()   + msid.education.table.slice(1);
        case msid.environment.id:
            return msid.environment.table.charAt(0).toUpperCase()   + msid.environment.table.slice(1);
        case msid.entertainment.id:
            return msid.entertainment.table.charAt(0).toUpperCase()   + msid.entertainment.table.slice(1);
        case msid.tvFeatured.id:
            return msid.tvFeatured.table.charAt(0).toUpperCase()   + msid.tvFeatured.table.slice(1);
        case msid.autoFeatured.id:
            return msid.autoFeatured.table.charAt(0).toUpperCase()   + msid.autoFeatured.table.slice(1);
        case msid.Events.id:
            return msid.Events.table.charAt(0).toUpperCase()   + msid.Events.table.slice(1);
        case msid.lifeStyle.id:
            return msid.lifeStyle.table.charAt(0).toUpperCase()   + msid.lifeStyle.table.slice(1);
        case msid.goodGovernance.id:
            return msid.goodGovernance.table.charAt(0).toUpperCase()   + msid.goodGovernance.table;
    }
}

function setupJoin() {
    for (let key in msid) {
        console.log(msid[key].table);
        let thisTable = userNews(msid[key].table);
        let News = newsModel(msid[key].table, sequelize);
        NewsAssociation[msid[key].id] = News;
        User.belongsToMany(News, {through: thisTable, as: msid[key].table});
        News.belongsToMany(User, {through: thisTable, as: msid[key].table});
        User.sync();
        News.sync();
        thisTable.sync();
    }
}

