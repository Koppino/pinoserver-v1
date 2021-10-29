const { ensureAuthenticated } = require("../config/auth");
const Person = require("../models/Person");

module.exports.getPeople = ensureAuthenticated,(req, res) => {
    Person.find({}, (err, people) => {
        if(err)console.log(err);
        
        res.render('people',{user: req.user, people:people})
    })
};
