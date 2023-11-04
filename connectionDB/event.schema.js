const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    rate: { type: Number},
    price: { type: Number},
    counter: { type: Number},
    deleted: { type: Boolean, default: false },

}, {
    timestamps: true
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;