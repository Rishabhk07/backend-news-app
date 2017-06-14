/**
 * Created by rishabhkhanna on 22/01/17.
 */
const express = require('express');
const route = express.Router();
const sequelize = require('../model/sequalize');

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


route.get('/fetch',(req,res)=>{
    sequelize.newsFromDb(function (body) {
        res.send(body);
    })
});

module.exports = route;