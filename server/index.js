const dotenv = require("dotenv").config()
const app = require("./src/app")
const cors = require("cors")
const PORT = process.env.PORT || 3000
const connectToDB = require("./src/config/database")


app.use(cors());


//added database connection
connectToDB();
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})