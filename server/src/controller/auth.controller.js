const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const bcrypjs = require("bcryptjs")
const { sendOtpEmail } = require("../utils/email")
const otpModel = require("../models/otp.model")



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


        // Generate OTP for account verification
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        console.log(`OTP for email: ${email} is ${otp}`)

        // Save OTP to database with expiration
        await otpModel.create({
            email,
            otp,
            action:"account_verification"
        })
        // Send OTP email to user
        await sendOtpEmail(email,otp,"account_verification")


        res.status(201).json({
            message:"User registered successfully and OTP sent to email for verification",
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


        if(!isValidUser.isVerified && isValidUser.role === "user"){
            // Generate OTP for account verification
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            console.log(`OTP for email: ${email} is ${otp}`)

            await otpModel.deleteMany({email,action:"account_verification"}) // Purane OTPs ko delete karna

            // Save OTP to database with expiration
            await otpModel.create({
                email,
                otp,
                action:"account_verification"
            })
            // Send OTP email to user
            await sendOtpEmail(email,otp,"account_verification")
            return res.status(403).json({
                message:'Account not verified. OTP sent to email for verification.'
            })  
        }


        
        // create token

        const token = await jwt.sign({
            id:isValidUser._id,
            email:isValidUser.email,
            username:isValidUser.username,
            role:isValidUser.role
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
    const {email,otp} = req.body

    try {
        //check for otp
        const validOTP = await otpModel.findOne({email,otp,action:"account_verification"})
        if(!validOTP){
            return res.status(400).json({
                message:'Invalid OTP'
            })
        }
        //update user verification status
        await userModel.findOneAndUpdate({email},{isVerified:true})
        //delete otp after verification
        await otpModel.deleteMany({email,action:"account_verification"})
        res.status(200).json({
            message:'Account verified successfully'
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}



module.exports={
    registerController,
    loginController,
    VerifyOTPController
}