const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWT = require('jsonwebtoken');
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user,done) => done (null, user));
passport.deserializeUser((user,done) => done(null, user));

passport.use( new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_BASE_URL}/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        //profile contains the user information from Google
        const user = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        }

        // create a JWT token for client and server for best isolaltion
        const token = JWT.sign(user , process.env.JWT_SECRET_KEY, {expiresIn: '1h'})

        // return the user and token
        done(null, {user, token})

    }
))

module.exports = passport;