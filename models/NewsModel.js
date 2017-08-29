/**
 * Created by rishabhkhanna on 07/07/17.
 */
const Sequelize = require('./sequelizeConnection');
let db = {
    st: {
        type: Sequelize.Sequelize.DataTypes.STRING
    },
    uid: {
        type: Sequelize.Sequelize.DataTypes.STRING
    },
    dl: {
        type: Sequelize.Sequelize.DataTypes.STRING
    },
    hl: {
        type: Sequelize.Sequelize.DataTypes.TEXT,
        field: 'news_heading'
    },
    imageid: {
        type: Sequelize.Sequelize.DataTypes.STRING
    },
    syn: {
        type: Sequelize.Sequelize.DataTypes.TEXT,
        field: 'news_detailed'
    },
    id:{
        type:Sequelize.Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    dm:{
        type:Sequelize.Sequelize.DataTypes.STRING
    },
    tn:{
        type:Sequelize.Sequelize.DataTypes.STRING
    },
    su:{
        type:Sequelize.Sequelize.DataTypes.STRING
    },
    key:{
        type:Sequelize.Sequelize.DataTypes.STRING,
        unique:true
    },
    msid:{
        type:Sequelize.Sequelize.DataTypes.STRING
    },
    story:{
        type:Sequelize.Sequelize.DataTypes.TEXT,
        field: 'news_story'
    },
    photoStory: {
        type:Sequelize.Sequelize.DataTypes.JSON,
        field: 'photo_story'
    },
    likes:{
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        defaultValue:0
    },
    dislikes: {
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        defaultValue:0
    },
    chats: {
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    }
};
function getTable(tableName) {
    let NewsSchema = Sequelize.db.define(tableName,db)
    NewsSchema.sync();
    return NewsSchema;
}
module.exports = getTable;