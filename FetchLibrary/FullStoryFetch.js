/**
 * Created by rishabhkhanna on 10/07/17.
 */
const axios = require('axios');
const photoStory = require('./photoStoryFetch');
function fetchFullStory(briefModel, callback) {
    // console.log(briefModel);
    console.log(briefModel.key);
    axios.get('http://timesofindia.indiatimes.com' +
        '/feeds/showfeed.cms?feedtype=sjson&version=v4&tag=news&msid=' + briefModel.key)
        .then(function (response) {
            if (response.status == 200) {
                let json = response.data.it
                briefModel.story = json.Story
                if(briefModel.syn){
                    briefModel.syn = json.syn
                }
                callback(briefModel)
            }
        }).catch(function (error) {
        throw error
    })
}
module.exports = {fetchFullStory};