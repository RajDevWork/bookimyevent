const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const bcrypjs = require("bcryptjs")



async function registerController(req,res){

    const {username,email,password} = req.body

    try {
        //check for username or email exists
        const isUserExists = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })
        if(isUserExists){
            return res.status(409).json({
                message:"User already exists with " + `${isUserAlreadyExists.email == email?"email":"username"}`
            })
        }

        //password hashed using bcrypt
        const hashedPassword = await bcrypjs.hash(password,10)

        //create user
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword
        })

        //create token
        const token = await jwt.sign({
            id:user._id,
            email:user.email,
            username:user.username
        }, process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie("token",token)

        const {password: _, ...updatedUser} = user.toObject() // password field ko exclude karna

        res.status(201).json({
            message:"User created successfully",
            user:updatedUser,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

async function loginController(req,res){

    res.send("Login controller")
}

async function VerifyOTPController(req,res){
    res.send("Verify OTP")
}



module.exports={
    registerController,
    loginController,
    VerifyOTPController
}