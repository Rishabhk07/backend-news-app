/**
 * Created by rishabhkhanna on 21/07/17.
 */
const sequelize = require('./sequelizeConnection');
const msid = require('../msid/newsMsid');
const userTables = [];
(function defineUserTables() {
    for(let key in msid){
        userTables[msid[key].table] = sequelize.db.define('user'+ msid[key].table , {
            rating: {
                type: sequelize.Sequelize.DataTypes.INTEGER,
                defaultValue: 0
            }
        });
    }
})();
const userNews = function (table) {
    return userTables[table]
};

module.exports = userNews;