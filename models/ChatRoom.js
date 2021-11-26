const { request } = require('express');
const mongoose = require('mongoose')

const ChatRoomSchema = new mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    lasMessage: { type:String},
    lastMessageTime: { type: Date},
    isRead: {type:Boolean, default:false}
})

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom;
