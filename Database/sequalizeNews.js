/**
 * Created by rishabhkhanna on 14/01/17.
 */
let Sequelize = require('sequelize');
const seq = require('../models/sequelizeConnection');
var sequelize = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});
var modelNews = require('../models/NewsModel');
const userNews = require('../models/userNews');
const User = require('../models/userModel');
// Test Data #######################################


//Test Data End ####################################################################


function checkDbConnection(cb) {
    seq.db
        .authenticate()
        .then(function (test) {
            console.log('Connection has been established successfully.');
            cb();
        }).catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
}


function createTable() {
    db.sync({force: true}).then(function () {
        console.log("Table created succesfully");
    })
}

function newsFromDb(callback, msid, offset, body) {
    // const db = sequelize.define(msid,modelDB);
    console.log(body.user_id);

    if (body.user_id === "null" ) {
        console.log("not auth")
        const db = modelNews(msid, seq.db);
        db.findAll({
            limit: 10,
            offset: 10 * offset,
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(function (body) {

            callback(body);
        }).catch(function (err) {
            console.log(err)
            console.log("db find All error");
        })
    } else {
        newsAuthFromDb(callback, msid, offset, body);
        console.log("Here is not null condition")
    }
}

function newsAuthFromDb(callback, msid, offset, body) {
    // const db = sequelize.define(msid,modelDB);
    console.log("Authenticated news");
    const db = modelNews(msid, seq.db);
    let thisTable = userNews(msid);
    User.belongsToMany(db, {through: thisTable});
    console.log("User belong to many")
    db.belongsToMany(User, {through: thisTable})
    console.log("DB belong to many")
    db.findAll({
        limit: 10,
        offset: 10 * offset,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{model: User, where: {facebook_user_id: body.user_id}, required: false, limit: null}]
    }).then(function (body) {

        callback(body);
    }).catch(function (err) {
        console.log("cannot fetch news ")
        console.log(err)
        console.log(err.message)
    })
}

function allNewsFromDb(callback, msid, offset) {
    const db = modelNews(msid, seq.db);
    db.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(function (body) {
        console.log(body);
        callback(body);
    }).catch(function (err) {
        console.log(err)
    })
}


var saveNewsToDb = (model, msid) => {
    console.log(msid.table);
    //create Table
    const News = modelNews(msid.table, seq.db);
    News.sync().then(function (body) {
            console.log("Promise Body : " + body);
            News.create(model).then(function (task) {
                User.addWorlds(task);
                console.log("successfully saved the news with id" + task.id);
                console.log(task);
            }).catch((err) => {
                console.log(err);
            })
        }
    );


};

module.exports = {checkDbConnection, saveNewsToDb, createTable, newsFromDb, allNewsFromDb};
