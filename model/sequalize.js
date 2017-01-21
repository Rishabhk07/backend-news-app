/**
 * Created by rishabhkhanna on 14/01/17.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('newsapp' , 'rishabh' , 'beyblade',{
    host:'localhost',
    dialect: 'mysql'
});

var test = sequelize.define('test',{
   name:{
       type:Sequelize.STRING
   },
    profession:{
       type:Sequelize.STRING
    },
    uid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    }
});

var news = sequelize.define('newsData', {
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
        type: Sequelize.STRING,
        field: 'news_heading'
    },
    imageId: {
        type: Sequelize.STRING
    },
    syn: {
        type: Sequelize.STRING,
        field: 'news_detailed'
    },
    id:{
       type:Sequelize.STRING
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
        type:Sequelize.INTEGER,
        primaryKey:true
    }

});

function checkDbConnection(cb){
    sequelize
        .authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');
            cb();
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });
}

module.exports = {test,checkDbConnection };
