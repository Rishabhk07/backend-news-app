/**
 * Created by rishabhkhanna on 22/08/17.
 */
const admin = require('firebase-admin');
const moment = require('moment');
const seq = require('../models/sequelizeConnection');
let serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const User = require('../models/userModel');
const getNewsTable = require('../models/NewsModel');
let currentBreifs = null;
let userFcmToken = [];
let counter  = 0;

User.findAll().then(function (response) {
    for (let key in response) {
        if (response[key].notification === true) {
            //sending notification for briefs only
            console.log("inside IF")
            if(userFcmToken.indexOf(response[key].fcm_token) === -1){
                userFcmToken.push(response[key].fcm_token)
            }
            //end
        } else {
            // getting to all the topic selected by user and sending  notification to that only
            for (let thisTopic of response[key].topics) {
                if (thisTopic.value === true) {
                    console.log(thisTopic.key);
                    let thisNews = getNewsTable(thisTopic.key, seq.db);
                    thisNews.findOne({
                        order: [['createdAt', 'DESC']]
                    }).then(function (response) {
                        console.log("News Response");
                        console.log(response.uid)
                        console.log(" Details: ")
                        console.log(response.syn);
                        console.log(new Date(response.createdAt));
                        console.log(new Date(response.createdAt) - Date.now());
                        let startDate = moment(response.createdAt, 'YYYY-M-DD HH:mm:ss')
                        let endDate = moment(new Date(Date.now()), 'YYYY-M-DD HH:mm:ss')
                        let timeElapsed = moment(endDate).diff(startDate, 'hours');
                        console.log(moment(endDate).diff(startDate, 'hours'));
                        if (timeElapsed < 2) {
                            let payload = {
                                data: {
                                    news_id: thisTopic.key,
                                    title: response.hl,
                                    image: response.imageid,
                                    detail: response.syn
                                }
                            };

                            admin.messaging().sendToDevice(response[key].fcm_token, payload)
                                .then(function (response) {
                                    console.log("Successfully send message");
                                    console.log(response)
                                }).catch(function (err) {
                                console.log("Error in sending message" + err);
                            })
                        }
                    }).catch(function (err) {
                        console.log(err)
                        console.log("this news cannot find")
                    })
                }
            }
// end
        }
    }
    getCurrentBriefs();
}).catch(function (err) {
    console.log(err)
    console.log("User cannot find error")
})

function sendToDevices() {
        admin.messaging().sendToDevice(userFcmToken, currentBreifs)
            .then(function (response) {
                console.log("successfully send message on brief");
                console.log(response.results)
            }).catch(function (err) {
            console.log("Error in sending message " + err);
        })
}

function getCurrentBriefs(){
    let thisNews = getNewsTable("briefs", seq.db);
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
                currentBreifs = {
                    data: {
                        news_id: "briefs",
                        title: response.hl,
                        image: response.imageid,
                        detail: response.syn
                    }
                };
                sendToDevices();
                console.log("TOKEN")

            }
        }).catch(function (err) {
            console.log(err);
            console.log("thisNews find one")
        })
}