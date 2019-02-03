const User = require("../../schemas/userModel");
const express = require("express");
const router = express.Router();

// ======================= Register Router ====================

router.post("/", (req, res) => {
  const credentials = req.body;
  const newUser = new User(credentials);

  newUser
    .save()
    .then(newuser => {
      res.status(200).json(newuser);
    })
    .catch(err => {
      res.status(422).json({ err: "Could not create user..." });
    });
});

module.exports = router;
