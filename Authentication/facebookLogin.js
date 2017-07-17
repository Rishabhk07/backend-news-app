/**
 * Created by rishabhkhanna on 15/07/17.
 */
const passport = require('passport')
    , FacebbookStratergy = require('passport-facebook').Strategy;

passport.use(new FacebbookStratergy({
        clientID: '485700021767720',
        clientSecret: '252ec84299a62fa5253bd4534bb8caf9',
        callbackURL: "http://localhost:9890/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        
    }
));
