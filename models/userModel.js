/**
 * Created by rishabhkhanna on 18/07/17.
 */
const sequelize = require('./sequelizeConnection');
let userSchema = {};
(function defineUserTable() {
     userSchema = sequelize.db.define('user', {
        email: {
            type: sequelize.Sequelize.DataTypes.STRING,
            unique: true
        },
        id: {
            type: sequelize.Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        facebook_user_id: sequelize.Sequelize.DataTypes.STRING,
        facebook_access_token: sequelize.Sequelize.DataTypes.STRING,
        facebook_refresh_token: sequelize.Sequelize.DataTypes.STRING,
        name: sequelize.Sequelize.DataTypes.STRING,
        via: sequelize.Sequelize.DataTypes.STRING,
        google_ser_id: sequelize.Sequelize.DataTypes.STRING,
        google_access_token: sequelize.Sequelize.DataTypes.STRING,
        google_refresh_token: sequelize.Sequelize.DataTypes.STRING,
        fcm_token: sequelize.Sequelize.DataTypes.STRING,
        notification_for: sequelize.Sequelize.DataTypes.BOOLEAN,
        topics: sequelize.Sequelize.DataTypes.JSON,
        notification: {
            type: sequelize.Sequelize.DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    userSchema.sync();
})();


module.exports = userSchema;