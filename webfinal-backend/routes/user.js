const router = require("express").Router();
const User = require("../models/User.js");

router.get("/addnewuser", async (req, res) => {
    let newUser = {
        username: "bozan",
        password: "kanarya34"
    }
    let user = new User(newUser);
    try {
      await user.save();
      res.send("New User Created");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router
