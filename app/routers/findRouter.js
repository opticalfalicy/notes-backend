const express = require("express");

const Data = require("../schemas/noteModel");
const User = require("../schemas/userModel");

const router = express.Router();

// ======================== Find Notes ============================

router.get("/notes", (req, res) => {
  // console.log("Notes api");
  // res.status(200).json({ api: "notes" });
  // res.status(200).json("hey");
  Data.find({})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/view/:_id", (req, res) => {
  const { _id } = req.params;

  Note.findById(_id)
    .populate("note")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ err: "Could not retrieve note" });
    });
});

// ======================== Find Users ============================

router.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err: "Could not display users..." });
    });
});

router.get("/users/:_id", (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .populate("notes")
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
