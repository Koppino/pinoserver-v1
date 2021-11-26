const { request } = require('express');
const mongoose = require('mongoose')

const ChatMessageSchema = new mongoose.Schema({
    mid: {
        type: Number
    },
    senderUserName:{
        type:String
    },
    senderUserId:{
        type:String
    },
    reciverUserName:{
        type:String
    },
    reciverUserId:{
        type:String
    },
    message:{
        type:String
    },
    createdAt: {
        type: Date
    },
    opened:{
        type:Boolean,
        default:false
    },
    room:{type:mongoose.Schema.Types.ObjectId, ref:'ChatRoom'}
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

module.exports = ChatMessage;
