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
            fs.appendFile("/home/rishabh/newsapp/backend-news-app/cronScripts/ApiFetched",counter+"\n",(err)=>{
                if(err) throw err;
                console.log("Data Was appen to File");
            })
    })
}



