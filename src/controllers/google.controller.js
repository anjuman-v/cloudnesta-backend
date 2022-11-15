const jwt = require("jsonwebtoken");

const passport = require("../configs/passport");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const { Router } = require("express");
const router = Router();
//google auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    const token = req.user.token;
    const user = JSON.stringify(req.user.user);
    // console.log(JSON.parse(user));
    return res.redirect(
      `http://localhost:3000?status=success&token=${token}&user=${user}`
    );
    // return res.status(201).send({ status: "success", user: req.user });
  }
);

module.exports = router;