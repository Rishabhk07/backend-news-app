/**
 * Created by rishabhkhanna on 07/07/17.
 */
const newsCategory = require("../model/NewsMsid");
const requestNews = require("../utils/requestNews");
const fs = require('fs');
for(let key in newsCategory){
    let counter = 0;
    console.log(newsCategory[key]);
        requestNews.fetchNews(newsCategory[key],function (body) {
            counter++;
            console.log("counter: " + counter);

            fs.appendFile("/home/rishabh/newsapp/backend-news-app/cronScripts/ApiFetched",new Date().toISOString().slice(0,10)+"\n",(err)=>{
                if(err) throw err;
            })
    })
}



