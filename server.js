const  express = require('express');
const request = require('request');
const app = express();
function requestNewsJson(msid) {

}

var port = process.env.PORT || 9090;

app.use('/' , express.static(__dirname + "/public"));

const routes = {
    news: require('./routes/news'),
    sequelize : require('./routes/test'),
    parse: require('./routes/parse')
};

app.use('/news' , routes.news);

app.use('/test', routes.sequelize);

app.use('/parse', routes.parse);

app.listen(port , ()=> {
    console.log("magic happens at " + port);
});