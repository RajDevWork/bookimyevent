const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
        title:{
            type:String,
            required:[true,"Event title is required"]
        },
        description:{
            type:String,
            required:[true,"Description of event is required"]
        },
        date:{
            type:Date,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        ticketPrice:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        totalSeates:{
            type:Number,
            required:true
        },
        avaiableSeates:{
            type:Number,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true
        }


},{
    timestamps:true
})


const eventModel = mongoose.model('events',eventSchema)

module.exports = eventModel