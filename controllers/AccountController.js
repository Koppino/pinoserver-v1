const Zaznam = require("../models/Zaznam");


module.exports.getAccountView = (req, res) => {
    Zaznam.find({user:req.user},null,{sort:{createdAt:1}}, (err,posts) => {
        if(err)console.log(err);
        res.render('acc',{user: req.user, posts:posts})
    })
};
