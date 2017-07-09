/**
 * Created by rishabhkhanna on 10/07/17.
 */
const request = require('request');
function fetchFullStory(briefModel,cb){
    // console.log(briefModel);
    let storyArray = [];
    for (let i =0 ; i < briefModel.length; i++){
        request('http://timesofindia.indiatimes.com' +
            '/feeds/showfeed.cms?feedtype=sjson&version=v4&tag=news&msid=' + briefModel[i].key,
            (error, response, body)=>{
                if(!error && response.statusCode == 200){
                    let json = (JSON.parse(body)).it;
                      console.log(JSON.stringify(json));
                        storyArray.push({"story": json.Story });
                        if (i === (briefModel.length -1)){
                            cb(storyArray)
                        }
                }
            })
    }

}

module.exports = {fetchFullStory};