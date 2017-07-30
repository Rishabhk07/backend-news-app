/**
 * Created by rishabhkhanna on 15/07/17.
 */
const passport = require('passport')
    , FacebbookStratergy = require('passport-facebook').Strategy
    ,User = require('../models/userModel')
    ,axios = require('axios');

module.exports = {
    facebookAuth(token, userId, callback) {
        User.findOne({where: {facebook_user_id: userId}})
            .then(function (user) {
                if(user){
                    body = {
                        success: true,
                        user: user
                    };
                    callback(body)
                }else{
                    axios.get('https://graph.facebook.com/v2.6/'+ userId +'?fields=email,name&access_token=' + token)
                        .then(function (response) {
                            const user = User.build({
                                facebook_user_id: userId,
                                facebook_access_token: token,
                                email : response.data.email,
                                name: response.data.name
                                });
                            user.save().then(function (user) {
                                    let body = {
                                        success: true,
                                        signup: true,
                                        user: user
                                    };
                                    callback(body);
                                }).catch(function (err) {
                                throw err
                            })
                        })
                }
            }).catch(function (err) {
                throw err;
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
    }
};

