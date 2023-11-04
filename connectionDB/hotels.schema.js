const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    rate: { type: Number},
    counter: { type: Number},
    deleted: { type: Boolean, default: false },
    
}, {
    timestamps: true
});
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;