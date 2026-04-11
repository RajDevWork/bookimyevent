const express = require('express')
const {identifyUser, adminAccess} = require("../middleware/auth.middleware")
const {bookEvent,sendBookingOtp,getMyBookings,confirmBooking,cancelBooking} = require("../controller/booking.controller")
const router = express.Router()

router.post("/",identifyUser,bookEvent)
router.post("/send-otp",identifyUser,sendBookingOtp)
router.get("/my-bookings",identifyUser,getMyBookings)
router.put("/:id/confirm",identifyUser,adminAccess,confirmBooking)
router.delete("/:id",identifyUser,cancelBooking)




module.exports = router