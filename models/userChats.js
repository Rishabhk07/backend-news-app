/**
 * Created by rishabhkhanna on 04/08/17.
 */
const sequelize = require('sequelize');

const db = new sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
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
    }
};

function getTable(tableName) {
    let chat = db.define(tableName,chatSchema);
    chat.sync();
    return chat;
}

module.exports  = getTable;
