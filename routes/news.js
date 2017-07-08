/**
 * Created by rishabhkhanna on 06/01/17.
 */
const express = require('express');
const route = express.Router();
const requestNews  = require('../utils/requestNews');
const msid = require('../model/NewsMsid');

route.get('/' , express.static(__dirname + "/public/news"));

//fetch briefs from toi website
route.get('/briefs' , (req , res)=>{

    requestNews.fetchNews(msid.briefs,(body)=>{
        res.send(body);
    })

});

//fetch top stories from toi website  
route.get('/top' , (req , res)=>{

    requestNews.fetchNews(msid.topNews, (body)=>{
        res.send(body);
    })

});

//fetch entertainment news
route.get('/entertainment' , (req , res)=>{

    requestNews.fetchNews(msid.entertainment, (body)=>{
        res.send(body);
    })

});

//fetch india news
route.get('/india' , (req , res)=>{

    requestNews.fetchNews(msid.india, (body)=>{
        res.send(body);
    })

});

//fetch world news
route.get('/world' , (req , res)=>{

    requestNews.fetchNews(msid.world, (body)=>{
        res.send(body);
    })

});

//fetch sports
route.get('/sports' , (req , res)=>{

    requestNews.fetchNews(msid.sports, (body)=>{
        res.send(body);
    })

});

//fetch cricket
route.get('/cricket' , (req , res)=>{

    requestNews.fetchNews(msid.cricket, (body)=>{
        res.send(body);
    })

});

//fetch business news
route.get('/business' , (req , res)=>{

    requestNews.fetchNews(msid.business, (body)=>{
        res.send(body);
    })

});

//fetch tech news
route.get('/tech' , (req , res)=>{

    requestNews.fetchNews(msid.tech, (body)=>{
        res.send(body);
    })

});

//fetch education
route.get('/education' , (req , res)=>{

    requestNews.fetchNews(msid.education, (body)=>{
        res.send(body);
    })

});

route.get('/environment',(req , res)=>{
   requestNews.fetchNews(msid.environment,(body)=>{
       res.send(body);
   })
});
route.get('/tv',(req , res)=>{
   requestNews.fetchNews(msid.tvFeatured,(body)=>{
       res.send(body);
   })
});
route.get('/auto',(req , res)=>{
   requestNews.fetchNews(msid.autoFeatured,(body)=>{
       res.send(body);
   })
});
route.get('/events',(req , res)=>{
   requestNews.fetchNews(msid.Events,(body)=>{
       res.send(body);
   })
});
route.get('/lifestyle',(req , res)=>{
   requestNews.fetchNews(msid.lifeStyle,(body)=>{
       res.send(body);
   })
});
route.get('/goodG',(req , res)=>{
   requestNews.fetchNews(msid.goodGovernance,(body)=>{
       res.send(body);
   })
});


module.exports = route;
//