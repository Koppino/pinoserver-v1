const User = require("../models/User");
const Zaznam = require('../models/Zaznam')
module.exports.getHomepage = (req, res) => {

    res.render('dashboard',{user: req.user})
};


module.exports.getDashboard = (req, res) => {
    Zaznam.find({personName: req.user.username},null,{sort:{createdAt: -1}}, (err, posts) => {
        if(err)console.log(err)
        if(!posts) res.render('dashboard', {posts: null, user:req.user})

        res.render('dashboard', {user : req.user, posts:posts, message: req.flash('danger')})
    })
}