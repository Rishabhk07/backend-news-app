/**
 * Created by rishabhkhanna on 14/01/17.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('newsapp' , 'rishabh' , 'beyblade',{
    host:'localhost',
    dialect: 'mysql'
});
var modelDB = require('./model');
const msidKey = require('../model/NewsMsid');
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

function newsFromDb(callback,msid) {
    const db = sequelize.define(msid,modelDB);
    db.findAll({
        limit: 10,
        order: [
            ['createdAt','DESC']
        ]
    }).then(function (body) {
        console.log(body);
        callback(body);
    })
}


var saveNewsToDb = (model,msid)=>{
    console.log(msid.table);
    //create Table
    const db = sequelize.define(msid.table,modelDB);
    db.sync().then(
        db.create(model).then(function (task) {
            console.log("successfully saved the news with id" + task.id);
            console.log(task);
        }).catch((err)=>{
            console.log(err);
        })
    );

};

module.exports = {checkDbConnection,saveNewsToDb, createTable, newsFromDb};
