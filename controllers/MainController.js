const User = require("../models/User");

module.exports.getHomepage = (req, res) => {

    res.render('dashboard',{user: req.user})
};


module.exports.getDashboard = (req, res) => {
    User.find({}, (err, users) => {
        if(err)console.log(err)
        if(!users) res.render('dashboard', {users: null, user:req.user})

        res.render('dashboard', {user : req.user, users:users})
    })
}