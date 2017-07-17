/**
 * Created by rishabhkhanna on 10/07/17.
 */
const axios = require('axios');
function fetchPhotoStory(briefModel, callback) {
    axios.get('http://timesofindia.indiatimes.com' +
        '/feeds/showfeed.cms' +
        '?feedtype=sjson&version=v4&tag=pssl&perpage=20&msid=' + briefModel.key)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response.data.it.items);
                briefModel.photoStory = response.data.it.items;
                callback(briefModel)
            }
        }).catch(function (error) {
        throw error
    });
}

module.exports = {fetchPhotoStory};