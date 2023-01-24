const router = require("express").Router();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verify = require("./verifyToken");

router.post("/signup", async (req, res) => {
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("User already exist!");

  //Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send("New User Created");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/signin", async (req, res) => {
  const userTemp = await User.findOne({ username: req.body.username });
  if (!userTemp) return res.status(400).send("User does not exist!");

  //Compare Passwords
  const validPass = await bcrypt.compare(req.body.password, userTemp.password);
  if (!validPass) return res.status(400).send("Invalid password!");

  //JWT
  const token = jwt.sign({ _id: userTemp._id }, process.env.TOKEN_SECRET);
  res.header("authorization", token).send("Login successful");
});

module.exports = router;
