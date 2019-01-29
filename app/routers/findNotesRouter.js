const express = require("express");

const Note = require("../schemas/noteModel.js");

const router = express.Router();

server.get("/", (req, res) => {
  console.log("Notes api");
  res.status(200).json({ api: "notes" });
  //   res.status(200).json("hey");
  //   Note.find({})
  //     .then(notes => {
  //       res.status(200).json(notes);
  //     })
  //     .catch(error => {
  //       res.status(500).json(error);
  //     });
});

// server.get("/:id", (req, res) => {
//   const { _id } = req.params._id;

//   Note.findById({})
//     .then(note => {
//       res.status(200).json(note);
//     })
//     .catch(err => {
//       res.status(500).json({ err: "Could not retrieve note" });
//     });
// });

module.exports = router;
