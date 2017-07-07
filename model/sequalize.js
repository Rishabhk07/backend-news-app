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

function callSave() {
    test.create(
        [
            {name : "yo" , profession : "katna"},
            {name : "Arnav" , profession : "Best Coder n developer"},
            {name : "Umair" , profession : "Coder n Developer"},
            {name : "Rishabh" , profession : "Beginer"},
            ]).then(function () {
        console.log("saved succesfulyy");
    }).catch(function (err) {
        console.log(err);
    })
}


//Test Data End ####################################################################


function checkDbConnection(cb){
    sequelize
        .authenticate()
        .then(function(test) {
            console.log('Connection has been established successfully.');
            cb();
        }).catch(function (err) {
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
    }
});

function createTable() {
    news.sync({force:true}).then(function () {
        console.log("Table created succesfully");
    })
}

function newsFromDb(callback) {
    var body;
    news.findAll().then(function (body) {
        console.log(body);
        callback(body);
    })
}


var saveNewsToDb = (model)=>{

    //create Table
    news.create(model).then(function (task) {
        console.log("successfully saved the news with id" + task.id);
        console.log(task);
    }).catch((err)=>{
        console.log(err);
    })
};

module.exports = {test,checkDbConnection,saveNewsToDb , callSave , createTable, newsFromDb};
