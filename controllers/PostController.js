const Zaznam = require("../models/Zaznamy")

module.exports.getPostsView = (req, res) => {
    Zaznam.find({user:req.user}, null, {sorted: {}}, (err, posts) => {
        if(err)console.log(err);
        res.render('posts/posts', {user:req.user, posts:posts})
    })

} 