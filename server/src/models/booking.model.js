const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
        
})

const bookingModel = mongoose.model('bookings',bookingSchema)
module.exports = bookingModel