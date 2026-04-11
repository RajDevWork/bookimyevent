const bookingModel = require("../models/booking.model")
const otpModel = require("../models/otp.model")
const {sendOtpEmail,sendBookingConfirmationEmail} = require("../utils/email")

async function bookEvent(req,res){
    try {
        const {eventId} = req.body
        const userId = req.user.id
        if(!eventId){
            return res.status(400).json({
                message:'Event id is required'
            })
        }
        // Check if user has already booked the event
        const existingBooking = await bookingModel.findOne({userId,eventId})
        if(existingBooking){
            return res.status(409).json({
                message:"You have already booked this event"
            })
        }
        // Create booking with pending status
        const booking = await bookingModel.create({
            userId,
            eventId,
            status:"pending",
            paymentStatus:"non_paid"
        })
        res.status(201).json({
            message:"Booking created successfully",
            booking
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }       


}

async function sendBookingOtp(req,res){
    try {
        const {bookingId} = req.body
        const userId = req.user.id
        if(!bookingId){
            return res.status(400).json({
                message:'Booking id is required'
            })
        }
        const booking = await bookingModel.findOne({_id:bookingId,userId}).populate('eventId')
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        if(booking.paymentStatus === "paid"){
            return res.status(400).json({
                message:"Booking is already paid"
            })
        }
        // Generate OTP and send email to user for payment confirmation
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        await otpModel.create({
            email:req.user.email,
            otp,
            action:"event_booking",
        })
        res.status(200).json({
            message:"OTP sent successfully"
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
        const booking = await bookingModel.findOne({_id:bookingId,userId})
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        booking.status = "confirmed"
        booking.paymentStatus = "paid"
        await booking.save()
        res.status(200).json({
            message:"Booking confirmed successfully"
        })
    } catch (error) {
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
        const booking = await bookingModel.findOne({_id:bookingId,userId})
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
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