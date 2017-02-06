const  express = require('express');
const request = require('request');
const app = express();
function requestNewsJson(msid) {

}



app.use('/' , express.static(__dirname + "/public"));

const routes = {
    news: require('./routes/news'),
    sequelize : require('./routes/test')
};

app.use('/news' , routes.news);

app.use('/test', routes.sequelize);



app.listen('9090' , ()=> {
    console.log("magic happens at 9090");
});