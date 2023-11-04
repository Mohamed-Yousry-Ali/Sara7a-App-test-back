const { StatusCodes } = require("http-status-codes");
const User = require("../../../connectionDB/user.schema");

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }

        const user = await User.findById(userId).select("-password").populate(["hotelId", "restaurantId", "visitPlaceId", "carId", "eventId"]);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        res.status(StatusCodes.OK).json({ message: "User:", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 15;
        }

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const allUsers = await User.find({ isDeleted: false }).select("-password").limit(limit).skip(skip);

        const all = await User.countDocuments({ isDeleted: false });
        const allPages = Math.ceil(all / limit);

        res.status(StatusCodes.OK).json({ message: "All users:", page, size, allPages, users: allUsers });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

const getAllUsersDeleted = async (req, res) => {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 15;
        }

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const allUsers = await User.find({ isDeleted: true }).select("-password").limit(limit).skip(skip);

        const all = await User.countDocuments({ isDeleted: true });
        const allPages = Math.ceil(all / limit);

        res.status(StatusCodes.OK).json({ message: "All users deleted:", page, size, allPages, users: allUsers });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const dataPayload = req.body;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        if (Object.keys(dataPayload).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No data provided for update" });
        }

        const user = await User.findByIdAndUpdate(userId, dataPayload, { new: true });
        res.status(StatusCodes.OK).json({ message: "User updated", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
};

const deleteSoftUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }

        await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
        res.status(StatusCodes.OK).json({ message: "User soft-deleted" });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }

        await User.findByIdAndDelete(userId);
        res.status(StatusCodes.OK).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const addNewAdmin = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
        }

        user.role = "admin";
        await user.save();

        res.status(StatusCodes.OK).json({ message: "User role updated to admin" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

const removeAdmin = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
        }

        user.role = "user";
        await user.save();

        res.status(StatusCodes.OK).json({ message: "Admin role removed" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const allAdmins = await User.find({ role: "admin" });

        if (!allAdmins || allAdmins.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No admins found" });
        }

        res.status(StatusCodes.OK).json({ message: "All admins:", admins: allAdmins });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};

module.exports = {
    getUser,
    deleteSoftUser,
    updateProfile,
    deleteUser,
    getAllUsers,
    getAllUsersDeleted,
    addNewAdmin,
    getAllAdmins,
    removeAdmin
};
