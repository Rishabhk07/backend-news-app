/**
 * Created by rishabhkhanna on 06/01/17.
 */

const request = require('request');
module.exports= {
    fetchNews(msid , calllback){

        request('http://timesofindia.indiatimes.com/feeds/newslistingfeed/' +
            'tag-alrt,msid-' + msid + ',feedtype-sjson,type-brief.cms?andver=' +
            '417&platform=android&adreqfrm=sec' , (error , response , body)=>{
            if(!error && response.statusCode == 200) {
                calllback(body);
            }
        });

    }
};

