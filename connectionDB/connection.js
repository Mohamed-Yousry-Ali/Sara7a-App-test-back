const mongoose = require("mongoose")

const connection = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/seyaha').then((res) => {
        console.log("DB connected")
    }).catch((err) => {
        console.log("error in db", err)
    })
}


module.exports = connection