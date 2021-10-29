const User = require("../models/User");

module.exports.getAcc = (req, res) => {

    res.render('acc',{user: req.user})
};
