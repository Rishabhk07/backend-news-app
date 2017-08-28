/**
 * Created by rishabhkhanna on 04/08/17.
 */
const sequelize = require('./sequelizeConnection');


let chatSchema = {
    id: {
        type: sequelize.Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: sequelize.Sequelize.DataTypes.TEXT,
    },
    news_type: {
        type: sequelize.Sequelize.DataTypes.STRING
    },
    msid: {
        type: sequelize.Sequelize.DataTypes.STRING
    },
    news_id: {
        type: sequelize.Sequelize.DataTypes.STRING
    },
    from: {
        type: sequelize.Sequelize.DataTypes.STRING
    },
    anonym:{
        type: sequelize.Sequelize.DataTypes.BOOLEAN
    }
};

function getTable(tableName) {
    let name = "Chat_" + tableName;
    let chat = sequelize.db.define(name,chatSchema,{charset: 'utf8mb4'});
    chat.sync();
    return chat;
}

module.exports  = getTable;
