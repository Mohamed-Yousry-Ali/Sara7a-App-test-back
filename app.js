const express = require('express')
const cors = require("cors")
const connection = require('./connectionDB/connection')
const userRouter = require('./modules/users/router/user.router')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
connection()
app.use(userRouter)



app.listen(port, () => {
    console.log("app running in port " + port)
})