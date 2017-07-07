/**
 * Created by rishabhkhanna on 06/01/17.
 */
const request = require('request');
const model = require('../model/toiNewsModel');
const sequelize = require('../model/sequalize');
module.exports = {
    fetchNews(msid, calllback){
        // sequelize.createTable();
        let newData = [];
        request('http://timesofindia.indiatimes.com/feeds/newslistingfeed/' +
            'tag-alrt,msid-' + msid + ',feedtype-sjson,type-brief.cms?andver=' +
            '417&platform=android&adreqfrm=sec', (error, response, body) => {
            if (!error && response.statusCode == 200) {
                // console.log(JSON.stringify(response.body));
                var json = (JSON.parse(body)).items;

                for (var i = 0; i < json.length; i++) {
                    if(json[i].tn === "brieflistAd" || json[i].hl == "" ){
                        json.splice(i,1);
                    }
                    // json[i].key = json[i].id;
                    // json[i].msid = msid;
                    // delete json[i].id;
                    // newData.push(json[i]);
                    // console.log(i + " ");
                    // console.log(newData[i]);
                    // sequelize.saveNewsToDb(json[i]);
                    console.log(json[i].hl);
                }

                // sequelize.callSave();
                //
                // sequelize.saveNewsToDb(newData);

                calllback(body);

                // var newsSet = new model.model(body.items);
                // console.log(newsSet);

            }
        });

    }
};

