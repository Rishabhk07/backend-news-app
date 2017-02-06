/**
 * Created by rishabhkhanna on 06/01/17.
 */
const request = require('request');
const model = require('../model/toiNewsModel');
const sequelize = require('../model/sequalize');
module.exports= {
    fetchNews(msid , calllback){
        // sequelize.createTable();
        var newData = [];
        request('http://timesofindia.indiatimes.com/feeds/newslistingfeed/' +
            'tag-alrt,msid-' + msid + ',feedtype-sjson,type-brief.cms?andver=' +
            '417&platform=android&adreqfrm=sec' , (error , response , body)=>{
            if(!error && response.statusCode == 200) {
                var json = (JSON.parse(body)).items;
                json.splice(1,1);
                json.splice(7,1);
               for(var i  = 0 ; i < json.length ; i++){
                   json[i].key = json[i].id;
                   delete json[i].id;
                   newData.push(json[i]);
                   console.log(i + " ");
                   console.log(newData[i]);
                   sequelize.saveNewsToDb(json[i]);
               }

               // sequelize.callSave();

               // sequelize.saveNewsToDb(newData);

                calllback(body);

                // var newsSet = new model.model(body.items);
                // console.log(newsSet);

            }
        });

    }
};

