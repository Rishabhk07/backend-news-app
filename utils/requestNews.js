/**
 * Created by rishabhkhanna on 06/01/17.
 */
const request = require('request');
const axios = require('axios');
const model = require('../model/toiNewsModel');
const sequelize = require('../Database/sequalize');
const fullStory = require('./FullStoryFetch');
const photoStory = require('./photoStoryFetch');
module.exports = {
    fetchNews(msid, calllback){
        // sequelize.createTable();
        // console.log("Inoming Msid: " + msid.id);
        let newData = [];
        axios.get('http://timesofindia.indiatimes.com/feeds/newslistingfeed/' +
            'tag-alrt,msid-' + msid.id + ',feedtype-sjson,type-brief.cms?andver=' +
            '417&platform=android&adreqfrm=sec')
            .then(function (response) {
                console.log(response.status);
                console.log(response.data);
                if (response.status === 200) {
                    // console.log(JSON.stringify(response.body));
                    let newData = [];
                    let json = response.data.items;
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].tn === "brieflistAd" || json[i].hl == "") {
                            json.splice(i, 1);
                        }

                        json[i].key = json[i].id;
                        json[i].msid = msid.id;
                        delete json[i].id;

                        // newData.push(json[i])
                        // fullStory.fetchFullStory(json[i], calllback);
                        if (json[i].tn === "photostory") {
                            console.log("photostory");
                                console.log("length: " + json.length)
                                photoStory.fetchPhotoStory(json[i], function (body) {
                                sequelize.saveNewsToDb(body, msid);
                                newData.push(body);
                                // if(i == json.length - 1){
                                //     calllback(newData)
                                // }
                            });
                        } else {
                            console.log("briefs");

                                fullStory.fetchFullStory(json[i], function (body) {
                                sequelize.saveNewsToDb(body,msid);

                                newData.push(body);
                                // if(i == json.length - 1){
                                //     calllback(newData)
                                // }
                            });
                        }
                    }

                }
            }).catch(function (error) {
            console.log(error)
        })

    }
};

