const express = require("express");

const Note = require("../schemas/noteModel");

const router = express.Router();

server.post("/new", (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  console.log("New Note");
  newNote
    .save()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(422).json({ err: "Error when creating the note" });
    });
});

module.exports = router;
