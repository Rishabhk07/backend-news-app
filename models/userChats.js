/**
 * Created by rishabhkhanna on 04/08/17.
 */
const sequelize = require('./sequelizeConnection');
const msid = require('../msid/newsMsid');
let userChats = [];
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
(function defineChatTables() {
    for (let key in msid){
        let name = "Chat_" + msid[key].table;
        userChats[msid[key].table] = sequelize.db.define(name,chatSchema,{charset: 'utf8mb4'});
        userChats[msid[key].table].sync();
    }
})();
function getTable(tableName) {
    return userChats[tableName];
}

module.exports  = getTable;
