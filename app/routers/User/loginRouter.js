const express = require("express");
const router = express.Router();
const User = require("../../schemas/userModel");

// Libraries:
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");

const secret = "no size limit on tokens";

// Make Token:

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    username: user.username,
    iat: timestamp
  };

  const options = { expiresIn: "900000" }; // 900,000 milliseconds or 15 mins
  return jwt.sign(payload, secret, options);
}

// Local Strategy:

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    console.log("strat here");
    console.log("user in localStrategy (updateUserRouter.js):", user);
    console.log("username in localStrategy (updateUserRouter.js):", username);
    console.log("password in localStrategy (updateUserRouter.js):", password);
    if (err) {
      done(err);
    } else if (user) {
      user.verifyPassword(password, function(err, isValid) {
        if (err) {
          return done(err);
        }
        if (isValid) {
          const { _id, username } = user;
          return done(null, { _id, username });
        }
        return done(null, false);
      });
    } else {
      return done(null, false);
    }
  });
});

passport.use(localStrategy);

const authenticate = passport.authenticate("local", { session: false });

router.post("/", authenticate, (req, res) => {
  console.log("TEQ.USER", req.user);
  res.json({
    success: `${req.user.username}, you are logged in!`,
    token: makeToken(req.user),
    user: req.user
  });
});

// router.post("/", (req, res) => {
//   // console.log("logged");
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

module.exports = router;
