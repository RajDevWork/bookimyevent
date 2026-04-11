const express = require('express')
const {identifyUser, adminAccess} = require("../middleware/auth.middleware")
const {getAllEvent,getEventById,createEvent,updateEventById,deleteEvent} = require("../controller/event.controller")


const router = express.Router()

//get all events
router.get("/",getAllEvent)

//get event by ID
router.get("/:id",getEventById)

//create event (only admin)

router.post("/", identifyUser,adminAccess,createEvent)

//update event (Admin only)
router.put("/:id",identifyUser,adminAccess,updateEventById)

//delete event (Admin only)

router.delete("/:id",identifyUser,adminAccess,deleteEvent)



module.exports = router