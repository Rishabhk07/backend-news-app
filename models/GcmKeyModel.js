/**
 * Created by rishabhkhanna on 16/10/17.
 */
const sequelize = require('./sequelizeConnection');
let fcmSchema = {};
(function defineGcmModel() {
    fcmSchema = sequelize.db.define('fcmKey',{
        fcm_token: {
            type: sequelize.Sequelize.DataTypes.STRING,
            unique: true,
        },
        id: {
            type: sequelize.Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    fcmSchema.sync();
})();

module.exports = fcmSchema;