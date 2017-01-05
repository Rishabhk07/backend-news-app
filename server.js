const  express = require('express');
const request = require('request');
const app = express();
function requestNewsJson(msid) {

}

const routes = {
    news: require('./routes/news')
};

app.use('/news' , routes.news);

app.listen('9090' , ()=> {
    console.log("magic happens at 9090");
});