/**
 * Created by rishabhkhanna on 07/07/17.
 */
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