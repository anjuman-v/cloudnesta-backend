require("dotenv").config();
const express = require("express");

const passport = require("./configs/passport");

const { register, login } = require("./controllers/auth.controller");
const googleAuth = require("./controllers/google.controller")
const gitAuth = require("./controllers/github.controller")
const linkedinAuth = require("./controllers/github.controller")


const connect = require("./configs/db");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(passport.initialize());

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true 
   })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/", function (req, res) {
  res.send("hello");
});

app.use('/', googleAuth)
app.use('/', gitAuth)
app.use('/', linkedinAuth)

app.post("/register", register);
app.post("/login", login);

app.listen(PORT, async function () {
  await connect();
  console.log(`listening on port ${process.env.PORT}`);
});
