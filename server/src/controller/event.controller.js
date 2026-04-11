const eventModel = require("../models/event.model")


async function getAllEvent(req,res){

    try {

        const filters = {}
        if(req.query.category){
            filters.category = req.query.category
        }
        if(req.query.location){
            filters.location = req.query.location
        }
        if(req.query.date){
            filters.date = new Date(req.query.date)
        }

        const events = await eventModel.find(filters).populate('createdBy')
        res.status(200).json({
            message:"Events fetched successfully",
            events
        })
    } catch (error) {
        res.status(500).json({
            message:"Error fetching events"
        })
    }

}

async function getEventById(req,res){
    try {
        const eventId = req.params.id
        const event = await eventModel.findById(eventId).populate('createdBy')
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }
        res.status(200).json({
            message:"Event fetched successfully",
            event
        })
    } catch (error) {
        res.status(500).json({
            message:"Error fetching event"
        })
    }
}

async function createEvent(req,res){
    try {
        const {title,description,date,location,ticketPrice,category,totalSeates,imageUrl} = req.body

        if(!title || !description || !date || !location || !ticketPrice || !category || !totalSeates || !imageUrl){
            return res.status(400).json({
                message:'All fields are required'
            })
        }

        const newEvent = await eventModel.create({
            title,
            description,
            date,
            location,
            ticketPrice,
            category,
            totalSeates,
            imageUrl,
            avaiableSeates:totalSeates,
            createdBy:req.user.id
        })
        res.status(201).json({
            message:"Event created successfully",
            event:newEvent
        })
    } catch (error) {
        res.status(500).json({
            message:"Error creating event"
        })
    }

}

async function updateEventById(req,res){
    try {
        const eventId = req.params.id
        const {title,description,date,location,ticketPrice,category,totalSeates,imageUrl} = req.body

        const event = await eventModel.findById(eventId)
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }

        const updatedEvent = await eventModel.findByIdAndUpdate(eventId,{
            title,
            description,
            date,
            location,
            ticketPrice,
            category,
            totalSeates,
            imageUrl,
            avaiableSeates:totalSeates
        },{new:true})

        res.status(200).json({
            message:"Event updated successfully",
            event:updatedEvent
        })
    } catch (error) {
        res.status(500).json({
            message:"Error updating event"
        })
    }


}
async function deleteEvent(req,res){

    try {
        const eventId = req.params.id
        const event = await eventModel.findById(eventId)
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }
        await eventModel.findByIdAndDelete(eventId)
        res.status(200).json({
            message:"Event deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Error deleting event"
        })
    }
}



module.exports = {
    getAllEvent,
    getEventById,
    createEvent,
    updateEventById,
    deleteEvent
}