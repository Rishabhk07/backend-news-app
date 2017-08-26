/**
 * Created by rishabhkhanna on 25/08/17.
 */
const express = require('express');
const route = express.Router();
const admin = require('firebase-admin');
const Sequelize = require('sequelize');
const moment = require('moment');
const User = require('../models/userModel');
const getNewsTable = require('../models/NewsModel');
let sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});
let serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
},"second");

route.get('/notify', (req, res) => {

    User.findAll().then(function (response) {
        for (let user of response) {
            if (user.notification === true) {
                //sending notification fo rbrief only
                let thisNews = getNewsTable("briefs", sequelize);
                thisNews.findOne({
                    order: [['createdAt', 'DESC']]
                }).then(function (response) {
                    let d = new Date();
                    console.log(moment().format());

                    console.log(new Date(response.createdAt));
                    console.log(new Date(response.createdAt) - Date.now());
                    let startDate = moment(response.createdAt, 'YYYY-M-DD HH:mm:ss')
                    let endDate = moment(new Date(Date.now()), 'YYYY-M-DD HH:mm:ss')
                    let timeElapsed = moment(endDate).diff(startDate, 'hours');
                    console.log(moment(endDate).diff(startDate, 'hours'));
                    if (timeElapsed < 50) {

                        console.log(startDate)
                        console.log(endDate)

                        console.log(response.hl)
                        let payload = {
                            data: {
                                news_id: "briefs",
                                title: response.hl,
                                image: response.imageid,
                                detail: response.syn
                            }
                        };
                        console.log("TOKEN")
                        console.log(user.fcm_token);
                        admin.messaging().sendToDevice(user.fcm_token, payload)
                            .then(function (response) {
                                console.log("successfully send message on brief");
                                console.log(response.results)
                                res.send({success: true})
                            }).catch(function (err) {
                            console.log("Error in sending message " + err);
                            res.send({success: false})
                        })
                    }
                })
                //end
            } else {
                // getting to all the topic selected by user and sending  notification to that only
                let anyTure = true;
                for (let thisTopic of user.topics) {
                    if (thisTopic.value === true) {
                        anyTure = false;
                        console.log(thisTopic.key);
                        let thisNews = getNewsTable(thisTopic.key, sequelize);
                        thisNews.findOne({
                            order: [['createdAt', 'DESC']]
                        }).then(function (response) {
                            console.log("News Response");
                            console.log(response.uid)
                            console.log(" Details: ")
                            console.log(response.syn);
                            let payload = {
                                data: {
                                    news_id: thisTopic.key,
                                    title: response.hl,
                                    image: response.imageid,
                                    detail: response.syn
                                }
                            };

                            admin.messaging().sendToDevice(user.fcm_token, payload)
                                .then(function (response) {
                                    console.log("Successfully send message");
                                    console.log(response)
                                }).catch(function (err) {
                                console.log("Error in sending message" + err);
                            })
                        })
                    }
                }

                if (anyTure) {
                    //sending notification fo rbrief only
                    let thisNews = getNewsTable("briefs", sequelize);
                    thisNews.findOne({
                        order: [['createdAt', 'DESC']]
                    }).then(function (response) {
                        let d = new Date();
                        console.log(moment().format());

                        console.log(new Date(response.createdAt));
                        console.log(new Date(response.createdAt) - Date.now());
                        let startDate = moment(response.createdAt, 'YYYY-M-DD HH:mm:ss')
                        let endDate = moment(new Date(Date.now()), 'YYYY-M-DD HH:mm:ss')
                        let timeElapsed = moment(endDate).diff(startDate, 'hours');
                        console.log(moment(endDate).diff(startDate, 'hours'));
                        if (timeElapsed < 2) {

                            console.log(startDate)
                            console.log(endDate)

                            console.log(response.hl)
                            let payload = {
                                data: {
                                    news_id: "briefs",
                                    title: response.hl,
                                    image: response.imageid,
                                    detail: response.syn
                                }
                            };
                            console.log("TOKEN")
                            console.log(user.fcm_token);
                            admin.messaging().sendToDevice(user.fcm_token, payload)
                                .then(function (response) {
                                    console.log("successfully send message on brief");
                                    console.log(response.results)
                                }).catch(function (err) {
                                console.log("Error in sending message " + err);
                            })
                        }
                    })
                    //end
                }
                res.send({multiple: true})
// end
            }
        }
    })

});

module.exports = route;