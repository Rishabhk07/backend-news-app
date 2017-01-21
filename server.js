const  express = require('express');
const request = require('request');
const app = express();
function requestNewsJson(msid) {

}



app.use('/' , express.static(__dirname + "/public"));

const routes = {
    news: require('./routes/news'),
    sequelize : require('./model/sequalize')
};

app.use('/news' , routes.news);

app.get('/test', (req , res)=>{
    routes.sequelize.checkDbConnection(()=>{
        res.send("coneection established succesfully");
    });
});

app.listen('9090' , ()=> {
    console.log("magic happens at 9090");
});