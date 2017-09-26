/**
 * Created by rishabhkhanna on 21/07/17.
 */
const express = require('express');
const route = express.Router();
const User = require('../models/userModel');
const userNews = require('../models/userNews');
const msid = require('../msid/newsMsid');
const newsModel = require('../models/NewsModel');
const userChats = require('../models/userChats');
const seq = require('../models/sequelizeConnection');
const getTableFromMsid = require('../routes/userChat');

route.post('/like', (req, res) => {

    let thisRating = req.body;
    console.log("LOG" + req.body.news_msid);
    let table = selectTable(req.body.news_msid);
    console.log(table);
    let News = newsModel(getTableFromMsid.getTableName(req.body.news_msid));

    console.log("Rating");
    console.log(thisRating.rating);
    // console.log(User.associations);
    // console.log(News.associations);
    console.log(thisRating.rating === '1');
    if(thisRating.rating === '1'){
        console.log(News.associations);
        console.log("here entered 1")
        User.findOne({
            where: {facebook_user_id: thisRating.user_id}
        }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id},
                include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
            }).then(function (news) {
                // here with the help of closure user will be available in inner function
                let likes = news.like;
                console.log(table);
                let foo = "remove" + table;
                user[foo](news, {through: {rating: 1}}).then(function (response) {
                    console.log("removed user from news");
                    console.log(response)
                    if(response > 0 ) {
                        // console.log("Rating on like");
                        // console.log(response[0]);
                        // console.log(response[0]);
                        news.decrement('likes');
                        News.findOne({
                            where: {id: thisRating.news_id},
                            include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
                        }).then(function (news) {
                            res.send(news)
                        }).catch(function (err) {
                            res.send({success: false})
                        })

                    }

                });

            }).catch(err => {
                res.send({success: false})
                throw err;
            })
        }).catch(err => {
            res.send({success: false});
            throw err;
        })
    }else if(thisRating.rating === '0'){

        console.log("here entered 0")
        User.findOne({
            where: {facebook_user_id: thisRating.user_id}
        }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id},
                include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
            }).then(function (news) {
                // here with the help of closure user will be available in inner function
                let likes = news.like;
                // console.log(table);
                let foo = "add" + table;
                user[foo](news, {through: {rating: 1}}).then(function (response) {
                    console.log("removed user from news");
                    // console.log(response)
                    if(response > 0) {
                        console.log("Rating on like");
                        // console.log(response);
                        news.increment('likes');
                        news.decrement('dislikes');
                        News.findOne({
                            where: {id: thisRating.news_id},
                            include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
                        }).then(function (news) {
                            res.send(news)
                        }).catch(function (err) {
                            res.send({success: false})
                        })
                    }
                });

            }).catch(err => {
                res.send({success: false})
                throw err;
            })
        }).catch(err => {
            res.send({success: false});
            throw err;
        })


    } else{
        User.findOne({
            where: {facebook_user_id: thisRating.user_id}
        }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id},
                include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
            }).then(function (news) {
                // here with the help of closure user will be available in inner function
                let likes = news.like;
                // console.log(table);
                let foo = "add" + table;
                user[foo](news, {through: {rating: 1}}).then(function (response) {
                    if(response !== undefined && response[0] !== undefined && response[0][0] !== undefined && response[0][0].rating === 1 ){
                        console.log("Rating on like");
                        // console.log(response[0]);
                        // console.log(response[0])
                        news.increment('likes')
                        News.findOne({
                            where: {id: thisRating.news_id},
                            include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
                        }).then(function (news) {
                            res.send(news)
                        }).catch(function (err) {
                            res.send({success: false})
                        })
                    }
                });

            }).catch(err => {
                res.send({success: false})
                throw err;
            })
        }).catch(err => {
            res.send({success: false});
            throw err;
        })
    }


});

route.post('/dislike', (req, res) => {
    let thisRating = req.body;
    // console.log("LOG" + req.body.news_msid);
    let table = selectTable(req.body.news_msid);
    // console.log(table);
    let News = newsModel(getTableFromMsid.getTableName(req.body.news_msid));
    // console.log(User.associations);
    // console.log(News.associations);
    // console.log(thisRating.rating);
    // console.log(thisRating.user_id);
    // console.log(thisRating.rating === '0')
    if(thisRating.rating === '0'){

        User.findOne({
            where: {facebook_user_id: thisRating.user_id}
        }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id},
                include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
            }).then(function (news) {
                // here with the help of closure user will be available in inner function


                let foo = "remove" + table;
                user[foo](news, {through: {rating: 0}}).then(function (response) {


                    if(response > 0) {
                        console.log("Response after adding new ");
                        // console.log(response);
                        news.decrement('dislikes')
                    }
                    News.findOne({
                        where: {id: thisRating.news_id},
                        include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
                    }).then(function (news) {
                        res.send(news)
                    }).catch(function (err) {
                        res.send({success: false})
                    })
                });
                // res.send(news)
            }).catch(err => {
                res.send({success: false});
                throw err;
            })
        }).catch(err => {
            res.send({success: false});
            throw err;
        })

    }else if(thisRating.rating === '1'){
        User.findOne({
            where: {facebook_user_id: thisRating.user_id}
        }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id},
                include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
            }).then(function (news) {
                // here with the help of closure user will be available in inner function


                let foo = "add" + table;
                user[foo](news, {through: {rating: 0}}).then(function (response) {

                    console.log(response);
                    if(response > 0) {
                        console.log("Response after adding new ");
                        // console.log(response);
                        news.increment('dislikes');
                        news.decrement('likes')
                    }
                    News.findOne({
                        where: {id: thisRating.news_id},
                        include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
                    }).then(function (news) {
                        res.send(news)
                    }).catch(function (err) {
                        res.send({success: false})
                    })
                });
                // res.send(news)
            }).catch(err => {
                res.send({success: false});
                throw err;
            })
        }).catch(err => {
            res.send({success: false});
            throw err;
        })
    } else{

        User.findOne({
            where: {facebook_user_id: thisRating.user_id}
        }).then(function (user) {

            News.findOne({
                where: {id: thisRating.news_id},
                include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
            }).then(function (news) {
                // here with the help of closure user will be available in inner function


                let foo = "add" + table;
                user[foo](news, {through: {rating: 0}}).then(function (response) {
                    if(response !== undefined  && response[0] !== undefined && response[0][0] !== undefined && response[0][0].rating ===  0) {
                        console.log("Response after adding new ");
                        // console.log(response);
                        news.increment('dislikes')
                        News.findOne({
                            where: {id: thisRating.news_id},
                            include: [{model: User, where: {facebook_user_id: thisRating.user_id}, required: false, limit: null}]
                        }).then(function (news) {
                            res.send(news)
                        }).catch(function (err) {
                            res.send({success: false})
                        })
                    }
                });



                // res.send(news)
            }).catch(err => {
                res.send({success: false});
                throw err;
            })
        }).catch(err => {
            res.send({success: false});
            throw err;
        })
    }

});

route.post('/getChattedNews', async (req, res) => {
    let user_id = req.body.user_id;
    let chattedList = [];
    for (let key in msid) {
        await userChats(msid[key].table).findAll({
            where: {from: user_id}
        }).then(function (response) {
            chattedList.push(response)
        }).catch(function (err) {
            console.log(err.message)
        })
    }
    res.send(chattedList);

});

route.post('/getRatedNews', (req, res) => {
    console.log(req.body.user_id);
    let user_id = req.body.user_id;
    let user_rating = req.body.user_rating;
    console.log(user_rating);
    // User.findOne({
    //     include: [{all: true,required: false}],
    //     where: {facebook_user_id: user_id}
    // }).then(function (response) {
    //     console.log(response);
    //     res.send(response);
    // }).catch(function (err) {
    //     console.log(err);
    //     console.log(err.message)
    // })
    let Briefs  = newsModel('briefs', seq.db);
    console.log(User.associations);
    User.findOne({
        where: {facebook_user_id: user_id},
        include: [{
            model: Briefs, required: false, limit: null, through: {
                where: {rating: user_rating}
            }
        }]
    }).then(function (response) {
        // console.log(response)
        res.send(response)
    }).catch(function (response) {
        console.log(response);
    })

})

route.post('/getNews', (req, res) => {

    console.log("LOG");
    let user_id = req.body.user_id;
    let sendBack = [];
    for (let key in msid) {
        let News = newsModel(msid[key].table);
        News.findAll({
            include: [{all: true, required: false, limit: null, where: {facebook_user_id: user_id}}],
            limit: 10
        }).then(function (news) {
            let n = news.filter(function (thisNews) {
                return thisNews.users.length === 0;
            });
            if(n!== [])
            sendBack.push(n);
            if (msid[key].id === '47082088') {
                res.send(sendBack)
            }

        }).catch(err => {
            res.send({success: false})
            throw err;
        })

    }
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
            return msid.goodGovernance.table.charAt(0).toUpperCase() + msid.goodGovernance.table.slice(1);
    }
}


