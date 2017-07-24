/**
 * Created by rishabhkhanna on 22/07/17.
 */
const express = require('express')
    ,route = express.Router()
    ,Sequelize = require('sequelize')
    ,User = require('../models/userModel');
const sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});

route("/getRate",(req,res)=>{


});