const Person = require("../models/Person");



module.exports.getPeopleByMyId = (req, res) => {
    const user = req.params.user
    Person.find({user:user},null, {sort: { bilance: 1 }}, (err, people) => {
        if(err) console.log(err)

        res.json({people})
    })

};
