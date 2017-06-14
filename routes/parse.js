/**
 * Created by rishabhkhanna on 12/03/17.
 */
const express = require('express');
const route = express.Router();
const ParseServer = require('parse-server').ParseServer;


const api = new ParseServer({
    databaseURI: "mongodb://localhost:27017",
    appId: "news",
    masterKey: "rishabh",
    serverURL: "http://localhost:9090/parse"
});


route.use('/' , api);

route.use('/users' , (req , res)=>{
    console.log("user sign up");
});


module.exports = route;

