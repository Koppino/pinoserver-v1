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
        type: Date,
        default: Date.now()
    },
    opened:{
        type:Boolean,
        default:false
    }
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

module.exports = ChatMessage;
