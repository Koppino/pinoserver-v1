const Person = require("../models/Person");
const User = require("../models/User");
const Zaznam = require("../models/Zaznam");
module.exports.getHomepage = (req, res) => {
  res.render("dashboard", { user: req.user });
};

module.exports.getDashboard = (req, res) => {
  let tydenZpet = [];

  if (req.user.admin) {
    Zaznam.find(
      { personName: req.user.username },
      null,
      { sort: { createdAt: -1 } },
      async (err, posts) => {
        if (err) console.log(err);
        if (!posts) res.render("dashboard", { posts: null, user: req.user });

        const predTydnem = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        await posts.forEach((post) => {
          if (post.createdAt.getTime() >= predTydnem.getTime()) {
            console.log(post.createdAt.getTime() + " " + post.createdAt);

            tydenZpet.push(post);
            console.log(tydenZpet.length);
            console.log(tydenZpet);
          } else {
            console.log("starsi");
          }
        });
        res.render("dashboard", {
          user: req.user,
          posts: posts,
          postsTydenZpet: tydenZpet,
          message: req.flash("danger"),
        });
      }
    );
  } else {
    Person.findOne({ name: req.user.username }, (err, iam) => {
      if (err) throw err;
      const kokot = `/person/get/${iam._id}`;
      res.redirect(kokot);
    });
  }
};