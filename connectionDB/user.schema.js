const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true ,},
        address: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin", "superAdmin"],
        },
        image: { type: String, default: null },
        gender: { type: String, required: true, enum: ["male", "female"] },
        isLogin: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        eventId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
        hotelId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
        carId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
        restaurantId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
        visitPlaceId: [{ type: mongoose.Schema.Types.ObjectId, ref: "VisitPlace" }],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    try {
        // Hash the password only if it has been modified or is new
        if (this.isModified("password") || this.isNew) {
            const hashedPassword = await bcrypt.hash(this.password, 8);
            this.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
