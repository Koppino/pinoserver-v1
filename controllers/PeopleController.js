const { ensureAuthenticated } = require("../config/auth");
const Person = require("../models/Person");
const User = require("../models/User");
const Zaznam = require("../models/Zaznam");

module.exports.getPeople = (req, res) => {
  Person.find({ user: req.user},null, { sort: { name : 1 } }, (err, people) => {
    if (err) console.log(err);
    console.log()
    res.render("people/people", { user: req.user, people: people });
  });
};

module.exports.getPeopleSortedByName = (req,res) => {
  Person.find({user:req.user}, null, {sort: {name: 1}}, (err, people) => {
    if(err)console.log(err);

    res.render('people/people', {user: req.user, people:people})

  })
}


module.exports.getAddView = (req, res) => {
  res.render("people/person-add", { user: req.user, errMsg: [] });
};

module.exports.addPerson = (req, res) => {
  const nickname = req.body.nickname;
  if (nickname) {
    Person.findOne({ name: nickname }, async (err, userExists) => {
      if (err) console.log(err);

      if (userExists) {
        res.render("people/person-add", {
          user: req.user,
          errMsg: `Člověk ${nickname} již existuje. Zvolte jinou přezdívku.`,
        });
      } else {
        await Person.find(
          {},
          null,
          { sort: { _id: 1 } },
          (err, lastPerson) => {
            if (err) console.log(err);
            let newId = 0;
            if (lastPerson.length >= 1) {
              newId = lastPerson[lastPerson.length - 1].personalId;
              console.log(newId);
            }
            const newPerson = new Person({
              name: nickname,
              personalId: newId + 1,
              user: req.user,
              zaznamy: [],
            });

            newPerson.save((err) => {
              if (err) console.log(err);
              res.redirect("/person");
            });
          }
        );
      }
    });
  } else {
    res.render("people/person-add", {
      user: req.user,
      errMsg: "Pole nesmí být prázdné !",
    });
  }
};

module.exports.getPersonById = (req, res) => {
  const _id = req.params._id;

  Person.findOne({ _id: _id }, (err, person) => {
    if (err) console.log(err);
    Zaznam.find({person:person._id}, null, {sort: { createdAt : -1}}, (err, personPosts) => {
      if(err)console.log(err);
      res.render("people/person", { user: req.user, person: person, personPosts: personPosts });
    })
    
  });
};
