const bookingModel = require("../models/booking.model")
const otpModel = require("../models/otp.model")
const {sendOtpEmail,sendBookingConfirmationEmail} = require("../utils/email")

function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}

async function bookEvent(req,res){
    try {
        const {eventId,otp} = req.body
        if(!eventId || !otp){
            return res.status(400).json({
                message:"Event id and OTP are required"
            })
        }
        const validOtp = await otpModel.findOne({email:req.user.email,otp,action:"event_booking"})
        if(!validOtp){
            return res.status(400).json({
                message:"Invalid OTP"
            })
        }
        const event = await eventModel.findById(eventId)
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }
        if(event.totalSeates <= 0){
            return res.status(400).json({
                message:"No seats available"
            })
        }     

        const existingBooking = await bookingModel.findOne({userId:req.user.id,eventId})
        if(existingBooking){
            return res.status(400).json({
                message:"You have already booked this event"
            })
        }
        const booking = await bookingModel.create({
            userId:req.user.id,
            eventId,
            amount:event.ticketPrice,
            status:"pending",
            paymentStatus:"not_paid"
        })
        // event.totalSeates -= 1
        await event.save()
        await otpModel.findOneAndDelete({email:req.user.email,action:"event_booking"})
        res.status(200).json({
            message:"Event booked successfully. Please confirm your booking.",
            bookingId:booking._id
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }


}

async function sendBookingOtp(req,res){
   try {
    const otp = generateOTP()
    await otpModel.findOneAndDelete({email:req.user.email,action:"event_booking"})
    await otpModel.create({
        email:req.user.email,
        otp,
        action:"event_booking"
    })
    await sendOtpEmail(req.user.email,otp,'event_booking')
    res.status(200).json({
        message:"OTP sent to your email"
    })
   } catch (error) {
    res.status(500).json({
        message:"Internal server error"
    })
   }

}

async function getMyBookings(req,res){
    try {
        const userId = req.user.id
        const bookings = await bookingModel.find({userId}).populate('eventId')
        res.status(200).json({
            message:"Bookings fetched successfully",
            bookings
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }

}

async function confirmBooking(req,res){
    try {
        const {bookingId} = req.body
        const userId = req.user.id
        if(!bookingId){
            return res.status(400).json({
                message:'Booking id is required'
            })
        }
        const paymentStatus = req.body.paymentStatus
        if(!paymentStatus || !["paid","not_paid"].includes(paymentStatus)){
            return res.status(400).json({
                message:"Invalid payment status"
            })
        }
        const booking = await bookingModel.findById(bookingId).populate('eventId')
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        if(booking.stattus ==="confirmed"){
            return res.status(400).json({
                message:"Booking is already confirmed"
            })
        }
        const event = await eventModel.findById(booking.eventId)
        if(event.totalSeates <= 0){
            return res.status(400).json({
                message:"No seats available"
            })
        }
        booking.status = "confirmed"
        if(paymentStatus){
            booking.paymentStatus = paymentStatus
        }
        await booking.save()
        event.totalSeates -= 1
        await event.save()

        //admin confirmation email to user
        await sendBookingConfirmationEmail(req.user.email,event.title,booking.id)
        res.status(200).json({
            message:"Booking confirmed successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })

    }
}


async function cancelBooking(req,res){
    try {
        const {bookingId} = req.body
        const userId = req.user.id
        if(!bookingId){
            return res.status(400).json({
                message:'Booking id is required'
            })
        }
        const booking = await bookingModel.findById(bookingId).populate('eventId')
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        if(booking.userId.toString() !== userId){
            return res.status(403).json({
                message:"You are not authorized to cancel this booking"
            })
        }
        if(booking.status === "confirmed"){
            const event = await eventModel.findById(booking.eventId)
            event.totalSeates += 1
            await event.save()
        }
        booking.status = "cancelled"
        await booking.save()
        
        res.status(200).json({
            message:"Booking cancelled successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }

}




module.exports = {
    bookEvent,
    sendBookingOtp,
    getMyBookings,
    confirmBooking,
    cancelBooking
}