const express = require("express");

//schema
const User = require("../../schemas/userModel");

const router = express.Router();

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    User.findById(id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .put((req, res) => {
    console.log("REQ", req.body);
    const { id } = req.params;
    const updateInfo = req.body;
    User.findByIdAndUpdate(
      id,
      {
        $pull: { notes: updateInfo.notes }
      },
      { new: true }
    )
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
