const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

exports.sendOtpEmail = async(email,otp,type)=>{
    const title = type === "account_verification" ? "Account Verification OTP" : "Event Booking OTP"
    const msg = type === "account_verification" ? `Your OTP for account verification is ${otp}` : `Your OTP for event booking is ${otp}`
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:email,
            subject:title,
            text:msg
        }

        await transporter.sendMail(mailOptions)
        console.log(`OTP email sent to ${email} for ${type}`)
        
    } catch (error) {
        console.log(`Error sending OTP email to ${email} for type ${type}: ${error.message}`)
    }
}

exports.sendBookingConfirmationEmail = async(email,eventName)=>{
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,   
            to:email,
            subject:"Event Booking Confirmation",
            text:`Your booking for the event ${eventName} has been confirmed.`
        }   
        await transporter.sendMail(mailOptions)
        console.log(`Booking confirmation email sent to ${email} for event ${eventName}`)
    } catch (error) {
        console.log(`Error sending booking confirmation email to ${email} for event ${eventName}: ${error.message}`)
    }   
}