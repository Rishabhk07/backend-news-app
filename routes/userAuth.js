/**
 * Created by rishabhkhanna on 21/07/17.
 */
const express = require('express');
const route = express.Router();
const stratergy = require('../Authentication/Stratergies');


route.post('/facebook',(req, res)=>{
    console.log(req.body);
    stratergy.facebookAuth(req.body.access_token,
        req.body.user_id, function (user) {
            res.send(user)
        })
});

route.post('/fbUpdateAcessToken',(req,res)=>{
    console.log(req.body)
    stratergy.updateFacebookAccessToken(req.body.access_token,req.body.user_id,function (body) {
        res.send(body)
    })
})

route.get('/facebook',(req,res)=>{
    console.log("YYOOYOYO")
    res.send("YO")
})

module.exports = route