/**
 * Created by rishabhkhanna on 28/08/17.
 */
const Sequelize = require('sequelize');
const db = new Sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'postgres',
    dialectOptions: {
        charset: 'utf8mb4'
    },
    pool: {
        max: 50,
        min: 0,
        idle: 1000
    },
    log: true
});
module.exports = {Sequelize, db}

console.log("RISHABH KHANNA")