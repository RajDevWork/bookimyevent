const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,'Username is required'],
        unique:[true,'Username already exists']
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,'Email already exists']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        select:false
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel