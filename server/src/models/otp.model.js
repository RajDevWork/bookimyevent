const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email is required']
    },
    otp:{
        type:String,
        required:[true,'Otp String is required'],
    },
    action:{
        type:String,
        enum:["account_verification","event_booking"],
        required:[true,"Action for otp is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300

    }
})

const otpModel = mongoose.model('opts',otpSchema)
module.exports = otpModel