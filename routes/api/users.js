const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load user model
const User = require("../../models/User");

//Route - Get api/users/test
//desc  - Tests users route
//access- Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//Route - Get api/users/register
//desc  - Register users route
//access- Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      // hashing the password
      //sending newUser password to hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//Route - Get api/users/register
//desc  - Register users route
//access- Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //finding user by email
  User.findOne({ email }).then(user => {
    // check user
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    // check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
          return res.status(400).json({password : 'password incorrect'})
      }
    });
  });
});

module.exports = router;
