/**
 * Created by rishabhkhanna on 06/01/17.
 */
const request = require('request');
const model = require('../model/toiNewsModel');
const sequelize = require('../Database/sequalize');
module.exports = {
    fetchNews(msid, calllback){
        // sequelize.createTable();
        console.log("Inoming Msid: " + msid.id);
        let newData = [];
        request('http://timesofindia.indiatimes.com/feeds/newslistingfeed/' +
            'tag-alrt,msid-' + msid.id + ',feedtype-sjson,type-brief.cms?andver=' +
            '417&platform=android&adreqfrm=sec', (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(JSON.stringify(response.body));
                let json = (JSON.parse(body)).items;
                for (let i = 0; i < json.length; i++) {
                    if(json[i].tn === "brieflistAd" || json[i].hl == "" ){
                        json.splice(i,1);
                    }

                    json[i].key = json[i].id;
                    json[i].msid = msid.id;
                    delete json[i].id;
                    newData.push(json[i]);
                    sequelize.saveNewsToDb(json[i],msid);
                }
                calllback(body);
            }
        });

    }
};

