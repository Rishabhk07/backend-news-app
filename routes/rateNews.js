/**
 * Created by rishabhkhanna on 21/07/17.
 */
const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const Sequelize = require('sequelize');
const userNews = require('../models/userNews');
const msid = require('../msid/newsMsid');
const newsModel = require('../models/NewsModel');

const sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    }
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
            let likes = news.like;
            let foo = "add" + table;
            user[foo](news, {through: {rating: 1}}).then(function (response) {
                news.increment('likes',{by:1})
            });
            news.addUser(user);
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
            user[foo](news, {through: {rating: 0}}).then(function (response) {
                news.decrement('dislikes',{by:1})
            });
            news.addUser(user);

            res.send({success: true})

        }).catch(err => {
            res.send({success: false});
            throw err;
        })
    }).catch(err => {
        res.send({success: false});
        throw err;
    })
});


route.post('/getNews', (req, res) => {
    // let params = req.body.user_id;
    // console.log(req.query);


    // News.findAndCountAll({
    //     include: [{all:true,required:false,limit:null}],
    //     required:false,
    //     limit: null
    // }).then(function (body) {
    //         res.send(body)
    //     }).catch(function (err) {
    //     throw err
    // });
    let thisRating = req.body;
    console.log("LOG");
    console.log(req.body.user_id)
    let News = NewsAssociation['1081479906'];
    News.findAll({
        include: [{all:true,required:false,limit:null}]
    }).then(function (news) {
        // console.log(News.associations);
        // News.findAndCountAll({
        //         include: 'User',
        //         required:false}).then(function (news) {
        //     // here with the help of closure user will be available in inner function
        //     // let foo = "add" + table;
        //     // user[foo](news, {through: {rating: 1}});
        //
        //     res.send(news)

        res.send(news)
        }).catch(err => {
            res.send({success: false})
            throw err;
        })



    // let responseNews = [];
    // for(let i in msid){
    // console.log(msid[i].table);
    // console.log(requestId);
    //     if(requestId.includes(msid[i].table)) {
    //         console.log(msid[i].table);
    //         sequelize.query('select * from user' + msid[i].table + 's A RIGHT JOIN '+ msid[i].table +'s B on A.'+ msid[i].table +'Id = B.id ' +
    //             'WHERE A.userId != ' + 1 + ' OR A.'+ msid[i].table +'Id IS NULL OR B.id is NULL ;', {type: sequelize.QueryTypes.SELECT}).then(function (response) {
    //             responseNews.push(JSON.stringify(response))
    //         })
    //     }
    // }



    //
    // sequelize.query('select * from userentertainments A RIGHT JOIN entertainments B on A.entertainmentId = B.id ' +
    //     'WHERE A.userId != '+ req.params.user_id +' OR A.entertainmentId IS NULL OR B.id is NULL ', {type: sequelize.QueryTypes.SELECT}).then(function (response) {
    //     res.send(response);
    // })
    //
    // sequelize.query('select * from userentertainments A RIGHT JOIN entertainments B on A.entertainmentId = B.id ' +
    //     'WHERE A.userId != '+ req.params.user_id +' OR A.entertainmentId IS NULL OR B.id is NULL ', {type: sequelize.QueryTypes.SELECT}).then(function (response) {
    //     res.send(response);
    // })
    //
    // sequelize.query('select * from userentertainments A RIGHT JOIN entertainments B on A.entertainmentId = B.id ' +
    //     'WHERE A.userId != '+ req.params.user_id +' OR A.entertainmentId IS NULL OR B.id is NULL ', {type: sequelize.QueryTypes.SELECT}).then(function (response) {
    //     res.send(response);
    // })
    //
    // sequelize.query('select * from userentertainments A RIGHT JOIN entertainments B on A.entertainmentId = B.id ' +
    //     'WHERE A.userId != '+ req.params.user_id +' OR A.entertainmentId IS NULL OR B.id is NULL ', {type: sequelize.QueryTypes.SELECT}).then(function (response) {
    //     res.send(response);
    // })
    //
    // sequelize.query('select * from userentertainments A RIGHT JOIN entertainments B on A.entertainmentId = B.id ' +
    //     'WHERE A.userId != '+ req.params.user_id +' OR A.entertainmentId IS NULL OR B.id is NULL ', {type: sequelize.QueryTypes.SELECT}).then(function (response) {
    //     res.send(response);
    // })
});




module.exports = route;


function selectTable(news_id) {
    switch (news_id) {
        case msid.briefs.id:
            console.log("briefs")
            return msid.briefs.table.charAt(0).toUpperCase() + msid.briefs.table.slice(1);
        case msid.topNews.id:
            return msid.topNews.table.charAt(0).toUpperCase() + msid.topNews.table.slice(1);
        case msid.india.id:
            return msid.india.table.charAt(0).toUpperCase() + msid.india.table.slice(1);
        case msid.world.id:
            return msid.world.table.charAt(0).toUpperCase() + msid.world.table.slice(1);
        case msid.sports.id:
            return msid.sports.table.charAt(0).toUpperCase() + msid.sports.table.slice(1);
        case msid.cricket.id:
            return msid.cricket.table.charAt(0).toUpperCase() + msid.cricket.table.slice(1);
        case msid.business.id:
            return msid.business.table.charAt(0).toUpperCase() + msid.business.table.slice(1);
        case msid.education.id:
            return msid.education.table.charAt(0).toUpperCase() + msid.education.table.slice(1);
        case msid.environment.id:
            return msid.environment.table.charAt(0).toUpperCase() + msid.environment.table.slice(1);
        case msid.entertainment.id:
            return msid.entertainment.table.charAt(0).toUpperCase() + msid.entertainment.table.slice(1);
        case msid.tvFeatured.id:
            return msid.tvFeatured.table.charAt(0).toUpperCase() + msid.tvFeatured.table.slice(1);
        case msid.autoFeatured.id:
            return msid.autoFeatured.table.charAt(0).toUpperCase() + msid.autoFeatured.table.slice(1);
        case msid.Events.id:
            return msid.Events.table.charAt(0).toUpperCase() + msid.Events.table.slice(1);
        case msid.lifeStyle.id:
            return msid.lifeStyle.table.charAt(0).toUpperCase() + msid.lifeStyle.table.slice(1);
        case msid.goodGovernance.id:
            return msid.goodGovernance.table.charAt(0).toUpperCase() + msid.goodGovernance.table;
    }
}

function setupJoin() {
    for (let key in msid) {
        console.log(msid[key].table);
        let thisTable = userNews(msid[key].table);
        let News = newsModel(msid[key].table, sequelize);

        User.belongsToMany(News, {through: thisTable});
        News.belongsToMany(User, {through: thisTable})
        console.log("ASSOCIATION");

        NewsAssociation[msid[key].id] = News;
        // User.belongsToMany(News, {through: 'user_news'});
        // News.belongsToMany(User, {through: 'user_news'});
        // User.hasMany(News, {through: thisTable, as: msid[key].table + msid[key].id});
        console.log(News.associations)
        User.sync();
        News.sync();
        thisTable.sync();

    }
}

