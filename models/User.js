const { request } = require('express');
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: false
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default: request.user,
        required:false
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
