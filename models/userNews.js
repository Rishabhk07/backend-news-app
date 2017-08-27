/**
 * Created by rishabhkhanna on 21/07/17.
 */
const sequelize = require('sequelize');
const db = new sequelize({
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

const userNews = function (table) {
    return db.define('user'+ table , {
        rating: {
            type: sequelize.DataTypes.INTEGER,
            defaultValue: 0
        }
    });
};

module.exports = userNews;