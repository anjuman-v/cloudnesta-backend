const jwt = require("jsonwebtoken");

const passport = require("../configs/passport");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const { Router } = require("express");
const router = Router();
//linkedin
app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", { state: "SOME STATE" }),
    function (req, res) {
      // The request will be redirected to LinkedIn for authentication, so this
      // function will not be called.
    }
  );
router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/" }),
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