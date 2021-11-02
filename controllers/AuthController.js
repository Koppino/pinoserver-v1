const mongoose = require("mongoose");
const User = require("../models/User");
const Person = require("../models/User");
const passport = require("passport");
const bcrypt = require('bcryptjs')

module.exports.doLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

module.exports.doLogout = (req, res) => {
  req.logout();
  res.status(100).redirect("/");
};

module.exports.getLogin = (req, res) => {
  res.render("auth/login", { user: req.user });
};

module.exports.getRegister = (req, res) => {
  res.render("auth/register", { user: req.user });
};

module.exports.doRegister = async (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  if (!username || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length <= 4) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("auth/register", {user:req.user,
      errors,
      username,
      password,
      password2,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("auth/register", {
          errors,
          username,
          password,
          password2,
          user: req.user,
        });
      } else {
        User.findOne({}, null, { sort: { createdAt: -1 } }, async(err, data) => {
            if (err) {
              console.log(err);
            } else {
              const newUser = new User({
                username: username,
                password: password,
                createdAt: Date.now(),
              });

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then((user) => {
                      res.render("auth/login", {
                        user: req.user,
                        message: req.flash("info"),
                      });
                    })
                    .catch((err) => console.log(err));
                });
              });
            }
          }
        );
      }
    });
  }
};
