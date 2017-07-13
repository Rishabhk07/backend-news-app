/**
 * Created by rishabhkhanna on 14/07/17.
 */
/**
 * Created by rishabhkhanna on 07/07/17.
 */
const Sequelize = require('sequelize');
let db = {
    uid: {
        type: Sequelize.DataTypes.STRING
    },
    dl: {
        type: Sequelize.DataTypes.STRING
    },
    hl: {
        type: Sequelize.DataTypes.TEXT,
        field: 'news_heading'
    },
    imageid: {
        type: Sequelize.DataTypes.STRING
    },
    syn: {
        type: Sequelize.DataTypes.TEXT,
        field: 'news_detailed'
    },
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    dm:{
        type:Sequelize.DataTypes.STRING
    },
    tn:{
        type:Sequelize.DataTypes.STRING
    },
    su:{
        type:Sequelize.DataTypes.STRING
    },
    key:{
        type:Sequelize.DataTypes.STRING,
        unique:true
    },
    msid:{
        type:Sequelize.DataTypes.STRING
    }
};
module.exports = db;