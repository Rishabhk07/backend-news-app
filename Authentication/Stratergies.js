/**
 * Created by rishabhkhanna on 15/07/17.
 */
const passport = require('passport')
    , FacebbookStratergy = require('passport-facebook').Strategy
    ,User = require('../models/userModel')
    ,axios = require('axios');

module.exports = {
    facebookAuth(req, callback) {
        User.findOne({where: {facebook_user_id: req.user_id}})
            .then(function (user) {
                if(user){
                    user.updateAttributes({
                       fcm_token: req.firebase_token
                    });
                    body = {
                        success: true,
                        user: user
                    };
                    callback(body)
                }else{
                    axios.get('https://graph.facebook.com/v2.6/'+ req.user_id +'?fields=email,name&access_token=' + req.access_token)
                        .then(function (response) {
                            const user = User.build({
                                facebook_user_id: req.user_id,
                                facebook_access_token: req.access_token,
                                email : response.data.email,
                                name: response.data.name,
                                fcm_token: req.firebase_token
                                });
                            user.save().then(function (user) {
                                    let body = {
                                        success: true,
                                        signup: true,
                                        user: user
                                    };
                                    callback(body);
                                }).catch(function (err) {
                                throw err.message
                            })
                        })
                }
            }).catch(function (err) {
                throw err.message;
            callback(err)
        })
    }
    ,
    updateFacebookAccessToken(newAcessToken, userId,callback){
        User.findOne({where: {facebook_user_id: userId}})
            .then(function (user) {
                if(user){
                    user.update({
                        facebook_access_token: newAcessToken
                    }).then(function (user) {
                        console.log("updated successfully")
                        callback({success:true, user: user})
                    })
                }else{
                    axios.get('https://graph.facebook.com/v2.6/'+ userId +'?fields=email,name&access_token=' + newAcessToken)
                        .then(function (response) {
                            const user = User.build({
                                facebook_user_id: userId,
                                facebook_access_token: newAcessToken,
                                email : response.data.email,
                                name: response.data.name
                            });
                            user.save().then(function () {
                                let body = {
                                    success: true,
                                    signup: true,
                                };
                                callback(body);
                            }).catch(function (err) {
                                throw err
                            })
                        }).catch(err=>{
                            throw err
                    })
                }
            }).catch(function (err) {
            throw err;
            callback(err)
        })
    },
    updateFcmToken(req,callback){
        User.findOne({where: {facebook_user_id: req.user_id}})
            .then(function (user) {
                user.updateAttributes({
                    fcm_token: req.token
                }).then(function (response) {
                    console.log("FCM token updates successfully")
                    callback({success:true,user:user})
                })
            })
    },
    updateUserTopics(req,callback){
        User.findOne({where: {facebook_user_id: req.user_id}})
            .then(function (user) {
                user.updateAttributes({
                    topics: JSON.parse(req.user_topics)
                }).then(function (reponse) {
                    console.log("Topics updated ");
                    callback({success: true, user: user})
                })
            })
    },
    updateNotification(req,callback){
        console.log("Notification changed");
        User.findOne({where: {facebook_user_id: req.user_id}})
            .then(function (user) {
                user.updateAttributes({
                    notification: req.notification
                }).then(function (response) {
                    callback({success: true, user});
                }).catch(function (err) {
                    callback({success: false})
                })
            })
    },

};

