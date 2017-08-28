/**
 * Created by rishabhkhanna on 01/08/17.
 */
const admin = require('firebase-admin');
const seq = require('../models/sequelizeConnection');
let serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const User = require('../models/userModel');
const getNewsTable = require('../models/NewsModel');

User.findAll().then(function (response) {
    console.log("USER TOPICS");
    for (let user of response) {
        for (let thisTopic of user.topics) {
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
    }
});

