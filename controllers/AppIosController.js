const Person = require("../models/Person");
const Zaznam = require("../models/Zaznam");



module.exports.getPeopleByMyId = (req, res) => {
    const user = req.params.user
    Person.find({user:user},null, {sort: { bilance: 1 }}, (err, people) => {
        if(err) console.log(err)

        res.json({people})
    })
};


module.exports.getPostsByMyId = (req, res) => {
    const user  = req.params.user
    Zaznam.find({user:user},null, {sort: { createdAt: -1}}, (err, posts) => {
        if(err) console.log(err);
console.log(posts)
        res.json({posts})
    })
}

