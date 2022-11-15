require("dotenv").config();

const passport = require('passport');

const { v4: uuidv4 } = require('uuid');

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GitHubStrategy = require( 'passport-github2' ).Strategy;

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const User = require("../models/user.model");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope:[ 'email', 'profile' ],
    passReqToCallback   : true
  },
  async function(req, accessToken, refreshToken, profile, done) { 

    // console.log(profile)

    let user = await User.findOne({email: profile?._json?.email}).lean().exec();
      if(! user) {
          user = await User.create({
              email: profile?._json?.email,
              password: uuidv4()
          })
      }
    const token = accessToken;
    return done(null, {user, token}) 
  }
));



//github 

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback",  // Backend heroku url 
  // scope:[ 'email' ]
},

async function(request, accessToken, refreshToken, profile, done) { 
  
  let user = await User.findOne({email: profile?._json?.login}).lean().exec();
  
  // if(! user) {
  //      user = await User.create({
  //           email: profile?._json?.email,
  //           password: uuidv4()
  //       })
  //   }
    // console.log(refreshToken)
  return done(null, {user})
}
));



//linkedin
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: "https://cloudnesta-backend.herokuapp.com/auth/linkedin/callback",
  // scope:[ 'profile' ]
},
async function(request, accessToken, refreshToken, profile, done) { 
  //  console.log(refreshToken)
    let user = await User.findOne({email: profile?._json?.email}).lean().exec();
    if(! user) {
        user = await User.create({
            email: profile?._json?.email,
            password: uuidv4()
        })
    }
  
  return done(null, {user})
}
));



module.exports = passport;


