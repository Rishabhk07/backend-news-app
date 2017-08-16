/**
 * Created by rishabhkhanna on 16/08/17.
 */
const requestNews = require("../FetchLibrary/requestNews");
const axios = require('axios');
const sequelize = require('../Database/sequalizeNews');
const fullStory = require('../FetchLibrary/FullStoryFetch');
const photoStory = require('../FetchLibrary/photoStoryFetch');
axios.get('http://timesofindia.indiatimes.com/feeds/newslistingfeedmc/feedtype-sjson,msid-1081479906,' +
    'tag-alrt,uid-Entertainment-01,t-f.cms?platform=android&andver=432&adreqfrm=sec').then(function (response) {
        console.log(response);
        console.log(response.status)
        let msid =  {id:"1081479906",table:"entertainment"}
    if (response.status === 200) {
        let newData = [];
        let json = response.data.items;
        for (let i = 0; i < json.length; i++) {
            console.log(json[i].tn);
            if (json[i].tn === "brieflistAd" || json[i].hl == "" || json[i].hl === undefined) {
                json.splice(i, 1);
            }
            if( json[i].tn === "html" || json[i].imageid === null){
                json.splice(i, 1);
            }

            json[i].key = json[i].id;
            json[i].msid = msid.id;
            json[i].table = msid.table;
            delete json[i].id;

            // newData.push(json[i])
            // fullStory.fetchFullStory(json[i], calllback);
            if (json[i].tn === "photostory") {
                console.log("photostory");
                console.log("length: " + json.length)
                photoStory.fetchPhotoStory(json[i], function (body) {
                    sequelize.saveNewsToDb(body, msid);
                    newData.push(body);
                });
            } else {
                console.log("briefs");

                fullStory.fetchFullStory(json[i], function (body) {
                    sequelize.saveNewsToDb(body, msid);
                    newData.push(body);
                });
            }
        }

    }
}).catch(function (error) {
    console.log(error)
})

