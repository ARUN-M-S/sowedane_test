const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600
    }
})

module.exports = TokenModel = mongoose.model("token", tokenSchema);