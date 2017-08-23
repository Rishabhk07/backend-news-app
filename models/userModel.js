/**
 * Created by rishabhkhanna on 18/07/17.
 */
const sequelize = require('sequelize');

const db = new sequelize({
    host: 'localhost',
    username: 'rishabh',
    database: 'newsapp',
    password: 'beyblade',
    dialect: 'mysql'
});

let userSchema = db.define('user', {
    email: {
        type: sequelize.DataTypes.STRING,
        unique: true
    },
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    facebook_user_id: sequelize.DataTypes.STRING,
    facebook_access_token: sequelize.DataTypes.STRING,
    facebook_refresh_token: sequelize.DataTypes.STRING,
    name: sequelize.DataTypes.STRING,
    via: sequelize.DataTypes.STRING,
    google_ser_id: sequelize.DataTypes.STRING,
    google_access_token: sequelize.DataTypes.STRING,
    google_refresh_token: sequelize.DataTypes.STRING,
    fcm_token: sequelize.DataTypes.STRING,
    notification_for: sequelize.DataTypes.BOOLEAN,
    topics: sequelize.DataTypes.JSON,
    notification: {
        type: sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
userSchema.sync();
module.exports = userSchema;