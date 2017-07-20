const  express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
function requestNewsJson(msid) {

}

var port = process.env.PORT || 9890;
app.use(bodyParser.urlencoded({extended:false}));
app.use('/' , express.static(__dirname + "/public"));

const routes = {
    news: require('./routes/newsApiTest'),
    sequelize : require('./routes/newsApiRoutes'),
    auth : require('./routes/userAuth')
};

app.use('/news' , routes.news);

app.use('/test', routes.sequelize);

app.use('/auth',routes.auth);


app.listen(9890 , ()=> {
    console.log("magic happens at " + port);
});

