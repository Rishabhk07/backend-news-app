/**
 * Created by rishabhkhanna on 07/07/17.
 */
const newsCategory = require("../model/NewsMsid");
const requestNews = require("../utils/requestNews");
for(let key in newsCategory){
    console.log(newsCategory[key]);
        requestNews.fetchNews(newsCategory[key],function (body) {
            console.log("counter: " + counter);
    })
}



