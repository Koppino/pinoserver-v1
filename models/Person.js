const { request } = require('express');
const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    personalId:{type:Number},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bilance: {
        type:Number,
        default:0
    },
    zaznamy: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Zaznam'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: request.user,
        required:false
    }
})

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
