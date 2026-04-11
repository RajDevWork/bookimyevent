const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const bcrypjs = require("bcryptjs")



async function registerController(req,res){

    const {username,email,password} = req.body

    try {

        //empty username and password
        if(email=='' || password=='' || username==''){
            return res.status(400).json({
                message:'All fields are required'
            })
        }

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


        //otp generation
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        console.log(`OTP for email: ${email} is ${otp}`)

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
    
    const {email,password} = req.body

    try {

        //empty username and password
        if(email=='' || password==''){
            return res.status(400).json({
                message:'All fields are required'
            })
        }
        
        //check for email
        const isValidUser = await userModel.findOne({email}).select("+password")
        if(!isValidUser){
            return res.status(401).json({
                message:'Invalid email or password'
            })
        }
        //check for password
        const isValidPassword = await bcrypjs.compare(password,isValidUser.password)
        if(!isValidPassword){
            return res.status(401).json({
                message:'Invalid email or password'
            })
        }  
        
        // create token

        const token = await jwt.sign({
            id:isValidUser._id,
            email:isValidUser.email,
            username:isValidUser.username
        },process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie("token",token);

        res.status(200).json({
            message:"User loggedin successfully",
            token
        })




    } catch (error) {
        res.status(401).json({
            message:'Invalid email or password'
        })
    }
}

async function VerifyOTPController(req,res){
    res.send("Verify OTP")
}



module.exports={
    registerController,
    loginController,
    VerifyOTPController
}