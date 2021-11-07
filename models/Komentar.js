const mongoose = require('mongoose')

const KomentarSchema = new mongoose.Schema({
    kid: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName:{
        type:String
    },
    postId: { 
        type: Number
    },
    message:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes:{
        type:Number
    }
})

const Komentar = mongoose.model('Komentar', KomentarSchema);

module.exports = Komentar;
