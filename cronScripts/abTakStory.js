/**
 * Created by rishabhkhanna on 14/07/17.
 */
const Sequelize = require('sequelize');
const msid = require('../model/NewsMsid');
var modelDB = require('../Database/scratchModel');
var request = require('../utils/requestNews');
const db = new Sequelize({
   host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});

db.query('show tables').then(function (rows) {
    // for(var i in rows) {
    //     for(var j in rows[i]) {
    //         let thisTable = rows[i][j].Tables_in_newsapp
    //         console.log()
    //         let table = db.define(thisTable,modelDB)
    //         table.findAll().then(function (body) {
    //                 console.log(body[0].msid);
    //                 request.fetchNews(body[0].msid,function (body) {
    //                     console.log(body)
    //                 })
    //         }).catch(function (error) {
    //             throw error
    //         })
    //
    //     }
    // }

    for(var key in msid){
        request.fetchNews(msid[key],function (body) {
            console.log(body)
        })
    }
});