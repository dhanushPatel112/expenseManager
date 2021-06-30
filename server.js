const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const expressValidator = require("express-validator")
require("dotenv").config()

const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")
const categoryRoutes = require("./routes/category")
const expenseRoutes = require("./routes/expense")
const incomeRoutes = require("./routes/income")

// app
const app = express()

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("DB Connected"))

mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`)
})

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

app.use("/api", userRoutes)
app.use("/api", authRoutes)
app.use("/api", categoryRoutes)
app.use("/api", expenseRoutes)
app.use("/api", incomeRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8000

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
