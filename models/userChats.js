/**
 * Created by rishabhkhanna on 04/08/17.
 */
const sequelize = require('sequelize');

const db = new sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    },
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});

let chatSchema = {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: sequelize.DataTypes.TEXT,
    },
    news_type: {
        type: sequelize.DataTypes.STRING
    },
    msid: {
        type: sequelize.DataTypes.STRING
    },
    news_id: {
        type: sequelize.DataTypes.STRING
    },
    from: {
        type: sequelize.DataTypes.STRING
    },
    anonym:{
        type: sequelize.DataTypes.BOOLEAN
    }
};

function getTable(tableName) {
    let name = "Chat_" + tableName;
    let chat = db.define(name,chatSchema,{charset: 'utf8mb4'});
    chat.sync();
    return chat;
}

module.exports  = getTable;
