const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:[true,'User id is required']
        },
        eventId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'events',
            required:[true,'Event id is required']
        },
        numberOfTickets:{
            type:Number,
            required:[true,'Number of tickets is required']
        },
        status:{
            type:String,
            enum:["pending","confirmed","cancelled"],
            default:"pending"
        },
        paymentStatus:{
            type:String,
            enum:["non_paid","paid"],
            default:"non_paid"
        },
        amount:{
            type:Number,
            required:[true,'Amount is required']
        }
},{
    timestamps:true
})

const bookingModel = mongoose.model('bookings',bookingSchema)
module.exports = bookingModel