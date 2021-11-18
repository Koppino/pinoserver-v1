const ChatMessage = require("../models/ChatMessage")

module.exports.getChatView = (req,res) => {

    res.render('chat/chat', {user:req.user, chatMessages: []})
}

module.exports.getChatViewWithFriend = (req,res) => {
ChatMessage.find({}, (err, messagess) => {
    if(err) throw err;
    res.render('chat/chat', {user:req.user, chatMessages:messagess})
})

}