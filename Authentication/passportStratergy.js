/**
 * Created by rishabhkhanna on 21/07/17.
 */
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/userModel');
module.exports  = function (passport) {

    passport.use(new BearerStrategy(
        function (token, done) {
            User.findOne({where: {access_token: token}})
                .then(function (user) {
                    if(!user)
                        return done(null,false);

                    return done(null,user)
                })
        }
    ))

}