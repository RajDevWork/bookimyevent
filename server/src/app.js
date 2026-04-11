const express = require("express")
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.routes")

app = express() // create server

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)

module.exports = app