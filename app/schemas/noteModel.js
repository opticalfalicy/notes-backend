const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// const subSchema = new mongoose.Schema({
//   title: {
//     type: String
//   },
//   content: {
//     type: String
//   }
// });

const noteSchema = new mongoose.Schema(
  {
    // notes: [subSchema],
    title: {
      type: String
    },
    content: {
      type: String
    },
    users: [{ type: ObjectId, ref: "User" }]
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema, "notes");
