const Person = require("../models/Person");
const Zaznam = require("../models/Zaznam");
const bcrypt = require('bcryptjs');
const User = require("../models/User");

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
    const _id = req.user._id
    const newpassword = req.body.password
    const newpassword2 = req.body.password2

    if (newpassword != newpassword2) {
        req.flash('danger', 'Hesla musí být stejné.')
        res.render('acc', {user:req.user, message: req.flash('danger')})
    }

    User.findOne({_id: _id }, (err, iam) => {
        if(err) console.log(err);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newpassword, salt, (err, hash) => {
              if (err) throw err;
              iam.password = hash;
              iam
                .save()
                .then((user) => {
                 res.redirect('/acc')
                })
                .catch((err) => console.log(err));
            });
          });
    })
}
