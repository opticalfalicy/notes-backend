const express = require("express");

//schema
const Note = require("../schemas/noteModel");

const router = express.Router();

router
  .route("/:_id")
  .get((req, res) => {
    const { _id } = req.params;
    Note.findById(_id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { _id } = req.params;
    Note.findByIdAndRemove(_id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
