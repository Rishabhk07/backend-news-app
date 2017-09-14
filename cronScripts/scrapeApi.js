/**
 * Created by rishabhkhanna on 07/07/17.
 */
const axios = require('axios');

axios.get('http://0.0.0.0:9890/cron/cronAllNews').then(function (response) {
    console.log("successfully fetched news")
    console.log(response)
}).catch(function (err) {
    console.log("err in fetching news")
    console.log(err)
})



