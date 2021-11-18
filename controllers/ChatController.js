module.exports.getChatView = (req,res) => {
    res.render('chat/chat', {user:req.user})
}