/**
 * Created by rishabhkhanna on 21/07/17.
 */
const express = require('express');
const route = express.Router();
const stratergy = require('../Authentication/Stratergies');


route.post('/facebook',(req, res)=>{
    console.log(req.body);
    stratergy.facebookAuth(req.body, function (user) {
            res.send(user)
        })
});

route.post('/fbUpdateAcessToken',(req,res)=>{
    console.log(req.body)
    stratergy.updateFacebookAccessToken(req.body.access_token,req.body.user_id,function (body) {
        res.send(body)
    })
});

route.post('/updateFcmToken',(req,res)=>{
    console.log(req.body);
    stratergy.updateFcmToken(req.body,function (body) {
        res.send(body)
    })
})

module.exports = route