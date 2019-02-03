const express = require("express");

const Item = require("../schemas/noteModel");

const router = express.Router();

// ======================== Create Note Router =========================

router.post("/note", (req, res) => {
  // const { title, content } = req.body;
  // const data = {title, content}
  // const newData = new Note(data);

  const data = req.body;
  const newItem = new Item(data);
  console.log("New Note");
  newItem
    .save()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(422).json({ err: "Error when creating the note" });
    });
});

module.exports = router;
