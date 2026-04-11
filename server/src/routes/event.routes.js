const express = require('express')
const {identifyUser, adminAccess} = require("../middleware/auth.middleware")
const router = express.Router()

//get all events
router.get("/",(req,res)=>{

})

//get event by ID
router.get("/:id",(req,res)=>{

})

//create event (only admin)

router.post("/", identifyUser,adminAccess,(req,res)=>{

})

//update event (Admin only)
router.put("/:id",identifyUser,adminAccess,(req,res)=>{

})

//delete event (Admin only)

router.delete("/:id",identifyUser,adminAccess,(req,res)=>{

})



module.exports = router