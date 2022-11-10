require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  let user;
  try {
    // check if the email provided already exists in the database
    user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res
        .status(400)
        .send({
          status: "failed",
          message: "Please try with a different email and password",
        });

    // if no then create a user with the information provided in the request body
    user = await User.create(req.body);

    if (!user)
      return res
        .status(500)
        .send({ status: "failed", message: "Please try again later" });

    // create a token for that user and return it
    const token = newToken(user);

    return res.status(201).json({ token,  status: "success",  user });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "failed", message: "Please try again later" });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({
        status: "failed",
      });
    const status = user.checkPassword(req.body.password);
    if (!status)
      return res.status(404).send({
        status: "failed",
      });
    const token = newToken(user);
    return res.status(201).send({ token, status: "success", user });
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      reason: error.message,
    });
  }
};

module.exports = { register, login };
