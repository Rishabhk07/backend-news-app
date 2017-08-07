/**
 * Created by rishabhkhanna on 07/07/17.
 */
const Sequelize = require('sequelize');
let db = {
    st: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    },
    dl: {
        type: Sequelize.STRING
    },
    hl: {
        type: Sequelize.TEXT,
        field: 'news_heading'
    },
    imageid: {
        type: Sequelize.STRING
    },
    syn: {
        type: Sequelize.TEXT,
        field: 'news_detailed'
    },
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    dm:{
        type:Sequelize.STRING
    },
    tn:{
        type:Sequelize.STRING
    },
    su:{
        type:Sequelize.STRING
    },
    key:{
        type:Sequelize.STRING,
        unique:true
    },
    msid:{
        type:Sequelize.STRING
    },
    story:{
        type:Sequelize.TEXT,
        field: 'news_story'
    },
    photoStory: {
        type:Sequelize.JSON,
        field: 'photo_story'
    },
    likes:{
        type: Sequelize.DataTypes.INTEGER,
        defaultValue:0
    },
    dislikes: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue:0
    },
    chats: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    }
};
function getTable(tableName,sequelize) {
    let NewsSchema = sequelize.define(tableName,db)
    NewsSchema.sync();
    return NewsSchema;
}
module.exports = getTable;