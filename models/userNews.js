/**
 * Created by rishabhkhanna on 21/07/17.
 */
const sequelize = require('./sequelizeConnection');
const userNews = function (table) {
    return sequelize.db.define('user'+ table , {
        rating: {
            type: sequelize.Sequelize.DataTypes.INTEGER,
            defaultValue: 0
        }
    });
};

module.exports = userNews;