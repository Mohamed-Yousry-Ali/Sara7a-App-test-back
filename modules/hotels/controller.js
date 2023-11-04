
const Hotel = require("../../connectionDB/hotels.schema")
const addHotel = async (req, res) => {

    let { hotelName, email, address, phone, location  } = req.body;
    let addHotel= await Hotel.insertMany({ hotelName, email, address, phone, location })

    res.status(201).json({ message: "Added Success", addHotel })


}

const updateHotel = async (req, res) => {
    const hotelid = req.params.id;
    let updatedHotel = await Hotel.findByIdAndUpdate(hotelid, {
        hotelName: req.body.hotelName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location 
    }, { new: true })
    res.json({ message: "Update Sucess", updatedHotel })
}

const deleteHotel = async (req, res) => {
    try {
        const hotelid = req.params.id;

        // Find the place by ID
        const hotel = await Hotel.findById(hotelid);
        if (!hotel) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        // Delete the place using its ID
        const deleteEvent = await Hotel.findByIdAndDelete(hotel);
        if (!deleteEvent) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        res.json({ message: 'Deleted successfully', deleteEvent });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteHotel = async (req, res) => {
    const hotelid = req.params.id;

    // Find the place by ID
    const hotel = await Hotel.findById(hotelid);
    if (!hotel) {
        return res.status(404).json({ error: 'event not found' });
    }
    const softHotel = await Hotel.findById(hotel);
    softHotel.deleted = true
    await softHotel.save();
    res.json({ message: "Soft Deleted Success" })


}
const getSoftDeleteHotels = async (req, res) => {
    const getsoftdellHotels = await Hotel.find({ deleted: true });
    res.json({ message: "All Soft Deleted Hotels", getsoftdellHotels })
}





const getallHotels = async (req, res) => {
    const allHotels = await Hotel.find();
    res.status(201).json({ message: "All Hotels", allHotels })
}


const getHotel = async (req, res) => {
    const hotelid = req.params.id;

    // Find the task by ID
    const hotel = await Hotel.findById(hotelid);


    res.status(201).json({ message: "get hotel", hotel })
}

module.exports = {
    addHotel,
    updateHotel,
    deleteHotel,
    getallHotels,
    getHotel,
    softdeleteHotel,
    getSoftDeleteHotels
}