const Person = require("../models/Person");
const Zaznam = require("../models/Zaznam");


module.exports.getAccountView = (req, res) => {
    Zaznam.find({user:req.user},null,{sort:{createdAt:1}}, (err,posts) => {
        if(err)console.log(err);
        Person.find({user:req.user}, (err, people) => {
            if(err) console.log(err);
            res.render('acc',{user: req.user, posts:posts, people:people})
        })
    })
};


module.exports.getChangePaswword = (req, res) => {
    res.render('acc/change-password', {user:req.user})
}

module.exports.doChangePaswword = (req, res) => {

}
