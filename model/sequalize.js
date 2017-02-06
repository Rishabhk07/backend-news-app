/**
 * Created by rishabhkhanna on 14/01/17.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('newsapp' , 'rishabh' , 'beyblade',{
    host:'localhost',
    dialect: 'mysql'
});
// Test Data #######################################
var test = sequelize.define('test', {
   name:{
       type:Sequelize.STRING
   },
    profession:{
       type:Sequelize.STRING
    },
    uid: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }

});


function saveTestData(cb){
    var saveTest = test.build({
        name:"Rishabh",
        profession:"Coder"
    });
    saveTest.save().then(function () {
        console.log("succesfully data saved");
        cb();
    })
}


function createTestTable(cb){
    test.sync({force: true}).then((err)=>{
        return test.create({
            name:"rishabh Khanna",
            profession:"Coder"
        })
    }).catch(function () {

    })

}

//Test Data End ####################################################################


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


var saveNewsToDb = (model)=>{
    news.create(model).then(function (task) {
        console.log("successfully saved the news with id" + task.id);
        console.log(task);
    })
};

module.exports = {test,checkDbConnection};
