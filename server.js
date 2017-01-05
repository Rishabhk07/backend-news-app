const  express = require('express');
const request = require('request');
const app = express();
function requestNewsJson(msid) {

}

app.use('/news' , (req, res)=>{

    request('http://timesofindia.indiatimes.com/feeds/newslistingfeed/' +
        'tag-alrt,msid-48986328,feedtype-sjson,type-brief.cms?andver=' +
        '417&platform=android&adreqfrm=sec' , (error , response , body)=>{
            if(!error && response.statusCode == 200) {
                res.send(body);
            }
    });


});

app.listen('9090' , ()=> {
    console.log("magic happens at 9090");
});