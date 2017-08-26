/**
 * Created by rishabhkhanna on 26/08/17.
 */
const axios = require('axios');

axios.get('http://0.0.0.0:9890/notification/notify').then(function (response) {
    console.log(response)
}).catch(function (err) {
    console.log("err in notification request");
    console.log(err)
})