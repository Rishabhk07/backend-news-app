/**
 * Created by rishabhkhanna on 22/01/17.
 */
const express = require('express');
const route = express.Router();
const sequelize = require('../Database/sequalizeNews');

route.get('/connection',(req , res)=>{
    sequelize.checkDbConnection(()=>{
        res.send("coneection established succesfully");
    })
});

route.get('/create',(req, res)=>{
    sequelize.createTestTable(()=>{
        res.send("Table created Succesfully");
    });
});

route.get('/save',(req, res)=>{
    sequelize.saveTestData(()=>{
        res.send("Table saved succesfully");
    })
});
route.get('/fetch/:msid',(req,res)=>{
    sequelize.allNewsFromDb(function (body) {
        res.send(body);
    },req.params.msid)
});


route.get('/fetch/:msid/:offset?',(req,res)=>{
    sequelize.newsFromDb(function (body) {
        res.send(body);
    },req.params.msid,req.params.offset)
});


module.exports = route;