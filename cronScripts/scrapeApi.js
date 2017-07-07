/**
 * Created by rishabhkhanna on 07/07/17.
 */
const newsCategory = require("../model/NewsMsid");
const requestNews = require("../utils/requestNews");
for(let key in newsCategory){
    let counter = 0;
    console.log(newsCategory[key]);
        requestNews.fetchNews(newsCategory[key],function (body) {
            counter++;
            console.log("counter: " + counter);
    })

}

