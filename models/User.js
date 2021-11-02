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
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
