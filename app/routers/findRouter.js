const express = require("express");

const Data = require("../schemas/noteModel.js");

const router = express.Router();

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

module.exports = router;
