const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    rate: { type: Number},
    counter: { type: Number},
       deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
const Car = mongoose.model("Car", carSchema);

module.exports = Car;