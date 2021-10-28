const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
    }
})

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
