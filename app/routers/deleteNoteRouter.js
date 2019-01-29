const express = require("express");

const Note = require("../schemas/noteModel.js");

const router = express.Router();

// server.delete("/:_id", (req, res) => {
//   Note.findByIdAndRemove(req.params._id)
//     .then(() => {
//       res.status(200).json({ status: "Note Deleted" });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
