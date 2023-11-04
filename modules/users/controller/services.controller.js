const { StatusCodes } = require("http-status-codes");

const addId = async (req, res, type) => {
    try {
        const id = req.body;
        if (id) {
            const user = req.user;
            user[type].push(id);
            await user.save();
            res.status(StatusCodes.OK).json({ message: `${type} id added` });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}

module.exports = {
    addCarId: (req, res) => addId(req, res, 'carId'),
    addEventId: (req, res) => addId(req, res, 'eventId'),
    addHotelId: (req, res) => addId(req, res, 'hotelId'),
    addRestaurantId: (req, res) => addId(req, res, 'restaurantId'),
    addVisitPlaceId: (req, res) => addId(req, res, 'visitPlaceId')
};
