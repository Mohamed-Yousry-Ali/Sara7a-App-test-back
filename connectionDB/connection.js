const mongoose = require("mongoose")

const connection = () => {
    return mongoose.connect(process.env.CONNECTION_STRING).then((res) => {
        console.log("DB connected")
    }).catch((err) => {
        console.log("error in db", err)
    })
}


module.exports = connection