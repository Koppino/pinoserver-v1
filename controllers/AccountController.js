

module.exports.getAccountView = (req, res) => {

    res.render('acc',{user: req.user})
};
