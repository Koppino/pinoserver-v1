const Person = require("../models/Person");
const User = require("../models/User");

module.exports.getPeople = (req, res) => {
  Person.find({ isDeleted: false }, (err, people) => {
    if (err) console.log(err);
  });
  res.render("people", { user: req.user });
};

module.exports.getAddView = (req, res) => {
  res.render("people/person-add", { user: req.user, errMsg: [] });
};

module.exports.addPerson = (req, res) => {
  
  const nickname = req.body.nickname;
  if (nickname) {
    Person.findOne({ name: nickname }, (err, userExists) => {
      if (err) console.log(err);

      if (userExists) {
        res.render("people/person-add", {
          user: req.user,
          errMsg: `Člověk ${nickname} již existuje. Zvolte jinou přezdívku.`,
        });
      } else {
        Person.find({}, null, { sorted: { createdAt: -1 } },async  (err, people) => {
          if (err) console.log(err);
          let newId = 1;
          if (people) {
             newId = people.first.personalId + 1;
             console.log(newId)

          const newPerson = new Person({
            name: nickname,
            personalId: newId,
            user: req.user,
            zaznamy: [],
          })
          
          await newPerson.save((newPers) => {
            console.log(newPers.name + "uložen");
            res.redirect("/person");
          });
        } });
   
      }
    });
  } else {
    res.render("people/person-add", {
      user: req.user,
      errMsg: "Pole nesmí být prázdné !",
    });
  }
};
