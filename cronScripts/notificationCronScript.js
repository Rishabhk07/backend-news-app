/**
 * Created by rishabhkhanna on 22/08/17.
 */
const admin = require('firebase-admin');
Sequelize = require('sequelize');
const moment = require('moment');
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
})
const User = require('../models/userModel');
const getNewsTable = require('../models/NewsModel');

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
            }).catch(function (err) {
                console.log(err)
                console.log("thisNews find one")
            })
            //end
        } else {
            // getting to all the topic selected by user and sending  notification to that only
            for (let thisTopic of user.topics) {
                if (thisTopic.value === true) {
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
                    }).catch(function (err) {
                        console.log(err)
                        console.log("this news cannot find")
                    })
                }
            }
// end
        }
    }
}).catch(function (err) {
    console.log(err)
    console.log("User cannot find error")
})
