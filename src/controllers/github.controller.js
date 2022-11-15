const jwt = require("jsonwebtoken");

const passport = require("../configs/passport");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const { Router } = require("express");
const router = Router();
//google auth
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    console.log("res" + req)

    // const token = req.user.token;
    
    // const user = JSON.stringify(req.user.user);
    // // console.log(JSON.parse(user));
    // return res.redirect(
    //   `http://localhost:3000?status=success&token=${token}&user=${user}`
    // );
    // return res.status(201).send({ status: "success", user: req.user });
  }
);

module.exports = router;