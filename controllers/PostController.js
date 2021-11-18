const Komentar = require("../models/Komentar");
const Person = require("../models/Person");
const Zaznam = require("../models/Zaznam");

module.exports.getPostsView = (req, res) => {
  Zaznam.find(
    { user: req.user },
    null,
    { sort: { createdAt: -1 } },
    (err, posts) => {
      if (err) console.log(err);
      res.render("posts/posts", { user: req.user, posts: posts });
    }
  );
};

module.exports.getAddPostView = (req, res) => {
  Person.find({ user: req.user, isDeleted: false }, (err, people) => {
    if (err) console.log(err);
    res.render("posts/post-add", {
      user: req.user,
      errMsg: [],
      people: people,
    });
  });
};

module.exports.addPost = (req, res) => {
  const status = req.body.status;
  const person = req.body.person;
  const user = req.body.user;
  const castka = req.body.castka;
  const zaplaceno = req.body.zaplaceno;
  const comment = req.body.comment;
  let newId = 1;
  Person.findOne({ _id: person }, (err, person) => {
    if (err) console.log(err);

    const personName = person.name;
    if (status == 0) {
      const dluh = zaplaceno - castka;
      console.log(dluh);
      person.bilance = person.bilance + dluh;
      person.save();
    }
    Zaznam.find({}, async (err, zaznamy) => {
      if (err) console.log(err);
      if (zaznamy.length >= 1) {
        newId = zaznamy[zaznamy.length - 1].zid + 1;
      }

      const newPost = new Zaznam({
        person: person,
        personName: personName,
        user: user,
        castka: castka,
        status: status,
        createdAt: Date.now(),
        zaplaceno: zaplaceno,
        comment: comment,
        zid: newId,
      });
      await newPost.save((err) => {
        if (err) console.log(err);
        res.redirect("/posts");
      });
    });
  });
};

module.exports.getPostById = (req, res) => {
  const _id = req.params._id;

  Zaznam.findOne({ _id: _id }, (err, zaznam) => {
    if (err) console.log(err);
    Komentar.find(
      { postId: zaznam.zid },
      null,
      { sort: { createdAt: -1 } },
      (err, komentare) => {
        if (err) console.log(err);
        res.render("posts/post", {
          user: req.user,
          post: zaznam,
          komentare: komentare,
        });
      }
    );
  });
};

module.exports.updatePostById = (req, res) => {
  if (req.user.admin == true) {
    console.log(req.body);
    const zaplacenoOld = req.body.zaplaceno;
    const zaplacenoNew = req.body.zaplacenonew;
    const person = req.body.person;
    const _id = req.body._id;
    const castka = req.body.castka;
    const rozdil = zaplacenoNew - zaplacenoOld;
    const rozdil2 = zaplacenoOld - castka;
    console.log(rozdil);
    Person.findOne({ _id: person }, async (err, person) => {
      if (err) console.log(err);
      if (req.body.status == 1) {
        person.bilance = person.bilance - rozdil2;
      } else {
        person.bilance = person.bilance + rozdil;
      }
      await person.save((err) => {
        if (err) console.log(err);

        Zaznam.findOne({ _id: _id }, (err, zaznam) => {
          if (err) console.log(err);
          zaznam.comment = req.body.comment;
          if (req.body.status == 1) {
            zaznam.zaplaceno = req.body.castka;
          } else {
            zaznam.zaplaceno = zaplacenoNew;
          }
          zaznam.status = req.body.status;
          zaznam.save((err) => {
            if (err) console.log(err);
            res.redirect("/posts");
          });
        });
      });
    });
  } else {
    req.flash("danger", "Nemáš oprávnění.");
    res.redirect("/");
  }
};

module.exports.addComment = (req, res) => {
  const zid = req.params.zid;
  const username = req.body.username;
  const user = req.body.user;
  const msg = req.body.msg;
  let newKid = 1
  Komentar.find({}, null, {sort:{ createdAt: -1}}, (err, komentare) => {
    if(err) console.log(err);
    if(komentare.length >= 1) {
      newKid = komentare[0].kid + 1
    }

    const newComment = new Komentar({
      user: user,
      userName: username,
      message: msg,
      createdAt: Date.now(),
      likes: 0,
      kid: newKid,
      postId: zid
    })

    newComment.save((err)=> {
      if(err) console.log(err);
      Zaznam.findOne({zid:newComment.postId}, (err, zaznam) => {
        if(err) throw(err);
        console.log('komment save.')
      res.redirect(`/posts/get/${zaznam._id}`);
      })
      
    })
  })
};
