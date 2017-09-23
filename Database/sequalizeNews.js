/**
 * Created by rishabhkhanna on 14/01/17.
 */
const seq = require('../models/sequelizeConnection')
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
    seq.db.sync({force: true}).then(function () {
        console.log("Table created succesfully");
    })
}

function newsFromDb(callback, msid, offset, body) {
    // const db = sequelize.define(msid,modelDB);
    // console.log(body.user_id);

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
        // console.log("Here is not null condition")
    }
}

function newsAuthFromDb(callback, msid, offset, body) {
    // const db = sequelize.define(msid,modelDB);
    // console.log("Authenticated news");
    const db = modelNews(msid);
    let thisTable = userNews(msid);
    // console.log("User belong to many")
    // console.log("DB belong to many")
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
    const db = modelNews(msid);
    db.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(function (body) {
        callback(body);
    }).catch(function (err) {
        console.log(err)
    })
}

function getThisNews(callback, params) {
    let db = modelNews(params.msid);
    db.findOne({
        where: {id: params.id}
    }).then(function (response) {
      callback(response)
    }).catch(function (err) {
        console.log(err)
    })
}


var saveNewsToDb = (model, msid) => {

    const News = modelNews(msid.table);
            News.create(model).then(function (task) {
                console.log("successfully saved the news with id");
            }).catch((err) => {
            })
};

module.exports = {checkDbConnection, saveNewsToDb, createTable, newsFromDb, allNewsFromDb,getThisNews};
