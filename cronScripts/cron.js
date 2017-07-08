/**
 * Created by rishabhkhanna on 08/07/17.
 */
const fs = require('fs');

fs.writeFile("/home/rishabh/" + Math.random(), "Hey There !!", function (err) {
    if(err){
        return console.log(err);
    }
    console.log("FIle saved successfully");
});