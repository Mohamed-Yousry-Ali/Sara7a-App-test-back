const statusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../../connectionDB/user.schema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { userName, email, password, gender, cPassword, age, phone, address } = req.body;
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        // console.log(existingUser)
        if (existingUser) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Email is already registered" });
        }
        // Check if the provided password matches the confirm password
        if (password !== cPassword) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Password and confirm password do not match" });
        }
        // Create a new user document
        const newUser = new User({
            userName,
            email,
            password,
            age,
            phone,
            address,
            gender
        });
        // Save the user to the database
        await newUser.save();
        res.status(statusCodes.CREATED).json({ message: "Registration successful" });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if the user exists and is not deleted
        if (!user || user.isDeleted) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Email is not found or user is deleted" });
        }        
        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Password is incorrect" });
        }
        
        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(statusCodes.FORBIDDEN).json({ message: "Email is not verified" });
        }

        // Sign a token with user information
        const token = jwt.sign(
            {
                id: user._id,
                userName: user.userName,
                isVerified: user.isVerified,
                isDeleted: user.isDeleted,
                isLogin: user.isLogin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } // Set a reasonable token expiration time
        );

        // Update the user's login status
        user.isLogin = true;
        await user.save();

        res.status(statusCodes.OK).json({ message: "Welcome", token });
    } catch (error) {
        // Handle errors and log them for debugging
        console.error("Login error:", error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error" });
    }
};

module.exports = { register, login };
