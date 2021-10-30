const mongoose = require('mongoose')

const ZaznamSchema = new mongoose.Schema({
    zid: {
        type: 'Number'
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    castka: { type: Number},
    status:{type:Number},
    dluh: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Zaznam = mongoose.model('Zaznam', ZaznamSchema);

module.exports = Zaznam;
