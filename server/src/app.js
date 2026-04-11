const express = require("express")
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.routes")
const eventRouter = require("./routes/event.routes")
const bookingRouter = require("./routes/booking.routes")

app = express() // create server

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/events",eventRouter)
app.use("/api/bookings",bookingRouter)

module.exports = app