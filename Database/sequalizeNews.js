/**
 * Created by rishabhkhanna on 14/01/17.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize({
    host:'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});
var modelNews = require('../models/NewsModel');
const User = require('../models/userModel');
// Test Data #######################################



//Test Data End ####################################################################


function checkDbConnection(cb){
    sequelize
        .authenticate()
        .then(function(test) {
            console.log('Connection has been established successfully.');
            cb();
        }).catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });
}




function createTable() {
    db.sync({force:true}).then(function () {
        console.log("Table created succesfully");
    })
}

function newsFromDb(callback,msid,offset) {
    // const db = sequelize.define(msid,modelDB);
    const db = modelNews(msid,sequelize);
    db.findAll({
        limit: 10,
        offset: 10*offset,
        order: [
            ['createdAt','DESC']
        ]
    }).then(function (body) {
        console.log(body);
        callback(body);
    })
}

function allNewsFromDb(callback,msid,offset) {
    const db = modelNews(msid,sequelize);
    db.findAll({
        order: [
            ['id','DESC']
        ]
    }).then(function (body) {
        console.log(body);
        callback(body);
    })
}


var saveNewsToDb = (model,msid)=>{
    console.log(msid.table);
    //create Table
    const News = modelNews(msid.table,sequelize);
    News.sync().then(function (body) {
            console.log("Promise Body : " + body);
            News.create(model).then(function (task) {
                User.addWorlds(task);
                console.log("successfully saved the news with id" + task.id);
                console.log(task);
            }).catch((err)=>{
                console.log(err);
            })
        }
    );

};

module.exports = {checkDbConnection,saveNewsToDb, createTable, newsFromDb,allNewsFromDb};
