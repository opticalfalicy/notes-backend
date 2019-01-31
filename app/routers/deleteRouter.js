const express = require("express");

const Data = require("../schemas/noteModel.js");

const router = express.Router();

// server.delete("/:_id", (req, res) => {
//   Note.findByIdAndRemove(req.params._id)
//     .then(() => {
//       res.status(200).json({ status: "Item Deleted" });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
