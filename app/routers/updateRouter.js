const express = require("express");

const Data = require("../schemas/noteModel");

const router = express.Router();

router
  .route("/:_id")
  .get((req, res) => {
    const { _id } = req.params;
    Data.findById(_id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .put((req, res) => {
    console.log("REQ", req.body);
    const { _id } = req.params;
    const updateInfo = req.body;

    Data.findOneAndUpdate(
      { _id: _id },
      { title: updateInfo.title, content: updateInfo.content },
      { new: true }
    )
      .then(response => {
        response.save();
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err, "Failed to edit");
      });
  });

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
