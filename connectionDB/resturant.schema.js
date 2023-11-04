const mongoose = require("mongoose");
const resturantSchema = new mongoose.Schema({
    restName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    rate: { type: Number},
    counter: { type: Number},
    deleted: { type: Boolean, default: false },
}, {
    timestamps: true
});
const Resturant = mongoose.model("Resturant", resturantSchema);

module.exports = Resturant;