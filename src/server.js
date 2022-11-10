require("dotenv").config()
const express = require("express");

const passport = require("./configs/passport");

const {register, login} = require("./controllers/auth.controller")

const connect = require("./configs/db")

const app = express();

app.use(express.json());

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user)
});


app.get("/", function(req, res) {
    res.send("hello");
})


//google auth
app.get('/auth/google',
    passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      return res.status(201).json({ status: "success", user: req.user });
    }
  );

  //github auth
  app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



  //linkedin
  app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));



app.post("/register", register); 
app.post("/login", login);



app.listen(process.env.SERVER_PORT, async function (){
    await connect();
    console.log(`listening on port ${process.env.SERVER_PORT}`);
})