const express = require("express");

const Note = require("../schemas/noteModel.js");

const router = express.Router();

// server.put("/:_id", (req, res) => {
// const { _id, title, content } = req.body;
// const id = { _id };
// if(!id) {
//     return res.status(422).json({error: 'Must provide a valid ID.'});
// }
// Note.findById(id, (err, note) => {
//     if(err || note === null) {
//         res.status(422).json({error: 'Cannot find a note with that ID.'});
//         return;
//     }
//     note.title = title
//     note.content = content
//     .save((saveErr, savedNote) => {
//         if(err || note === null) {
//             res.status(500);
//             res.json({ error:'Something really bad happened.'})
//             return;
//         }
//         res.json(note);
//     });
// });

//   Note.findByIdAndUpdate(req.params._id, req.body)
//     .then(() => {
//       res.status(200).json({ update: "Note Updated" });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
