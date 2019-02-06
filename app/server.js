// 2 + 2 === 4;
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const cors = require("cors");
const helmet = require("helmet");
const corsOptions = {
  //   origin: "https://peaceful-meadow-91763.herokuapp.com/",
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
  // credentials: true
};

const server = express();

// const { login } = require('./login.js');
// const Note = require("./schemas/noteModel");
// const User = require("./userModel");

server.use(bodyParser.json());
server.use(cors());
server.use(cors(corsOptions));
server.use(morgan("dev"));

// const url = process.env.MONGOLAB_URI;

// mongoose.connect('mongodb://user:pass@ds215370.mlab.com:15370/heroku_zbnm6575', {}, err => {
//     if(err) return console.log(err);
//     console.log('Mango Up Bruh');
// })
// mongoose.connect(
//   "mongodb://localhost:27017/myapp",
//   { useNewUrlParser: true },
//   err => {
//     if (err) return console.log(err);
//     console.log("Mango Up Bruh");
//   }
// );

// mongoose.connect("mongodb://admin:n0t3tak3r@ds163044.mlab.com:63044/notes", {
//   useNewUrlParser: true
// });

mongoose.connect("mongodb://localhost/notes", { useNewUrlParser: true });

server.get("/test", (req, res) => {
  res.status(200).json({ api: "notes" });
});

// --------------------- ROUTERS requires ===================//

const createRouter = require("./routers/createRouter");
const findRouter = require("./routers/findRouter");
const deleteRouter = require("./routers/deleteRouter");
const updateRouter = require("./routers/updateRouter");
const loginRouter = require("./routers/User/loginRouter");
const registerRouter = require("./routers/User/registerRouter");
const addToUserRouter = require("./routers/User/addToUserRouter");
const removeFromUserRouter = require("./routers/User/removeFromUserRouter");
const updateUserRouter = require("./routers/User/updateUserRouter");

// ================= ROUTERS.use ================

// Notes Routes

server.use("/api/c", createRouter);
server.use("/api/d", deleteRouter);
server.use("/api/f", findRouter);
server.use("/api/u", updateRouter);

// User Routes

server.use("/api/r", registerRouter);
server.use("/api/l", loginRouter);
server.use("/api/u/a", addToUserRouter);
server.use("/api/u/r", removeFromUserRouter);
server.use("/api/u/u", updateUserRouter);

// server.get("/", (req, res) => {
//   console.log("Notes api");
//   res.status(200).json({ api: "notes" });
//   //   res.status(200).json("hey");
//   //   Note.find({})
//   //     .then(notes => {
//   //       res.status(200).json(notes);
//   //     })
//   //     .catch(error => {
//   //       res.status(500).json(error);
//   //     });
// });

// server.post("/new", (req, res) => {
//   const { title, content } = req.body;
//   const newNote = new Note({ title, content });
//   console.log("New Note");
//   newNote
//     .save()
//     .then(note => {
//       res.status(200).json(note);
//     })
//     .catch(err => {
//       res.status(422).json({ err: "Error when creating the note" });
//     });
// });

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

// server.delete("/:_id", (req, res) => {
//   Note.findByIdAndRemove(req.params._id)
//     .then(() => {
//       res.status(200).json({ status: "Note Deleted" });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// New User Routes //

// server.get("/users", (req, res) => {
//   User.find({})
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res.status(500).json({ err: "Could not display users..." });
//     });
// });

// server.post("/register", (req, res) => {
//   const { username, password } = req.body;
//   const newUser = new User({ username, password });

//   newUser
//     .save()
//     .then(newuser => {
//       res.status(200).json(newuser);
//     })
//     .catch(err => {
//       res.status(422).json({ err: "Could not create user..." });
//     });
// });

// server.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (username && password) {
//     User.findOne({ username })
//       .then(user => {
//         user.checkPassword(password, (nonMatch, hashMatch) => {
//           if (nonMatch !== null) {
//             res.status(422).json({ Error: "Password is invalid..." });
//           } else if (nonMatch === null && hashMatch) {
//             const payload = { username, id: user._id };
//             res.status(200).json({ id: user._id });
//           } else {
//             res.status(500);
//           }
//         });
//       })
//       .catch(err => {
//         res.status(500).json({ err: `Login failed...` });
//       });
//   } else {
//     res.status(422).json({ Error: "Username and Password required." });
//   }
// });

const port = process.env.PORT || 5000;

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Mangos Grown at ${port}`);
});
