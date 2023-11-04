
const Car = require("../../connectionDB/car.schema");
const Resturant = require("../../connectionDB/car.schema")
const addCar = async (req, res) => {

    let { carName, email, address, phone, location } = req.body;
    let addCar = await Car.insertMany({ carName, email, address, phone, location })

    res.status(201).json({ message: "Added Success", addCar })


}

const updateCar = async (req, res) => {
    const carid = req.params.id;
    let updatedCar = await Car.findByIdAndUpdate(carid, {
        carName: req.body.restName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location
    }, { new: true })
    res.json({ message: "Update Sucess", updatedCar })
}

const deleteCar = async (req, res) => {
    try {
        const carid = req.params.id;

        // Find the place by ID
        const car = await Resturant.findById(carid);
        if (!car) {
            return res.status(404).json({ error: 'place not found' });
        }

        // Delete the place using its ID
        const deletedCar = await Car.findByIdAndDelete(carid);
        if (!deletedCar) {
            return res.status(404).json({ error: 'place not found' });
        }

        res.json({ message: 'Deleted successfully', deletedCar });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteCar = async (req, res) => {
    const carid = req.params.id;

    // Find the place by ID
    const car = await Resturant.findById(carid);
    if (!car) {
        return res.status(404).json({ error: 'place not found' });
    }
    const softCar = await Car.findById(car);
    softCar.deleted = true
    await softCar.save();
    res.json({ message: "Soft Deleted Success" })


}
const getSoftDeleteCar = async (req, res) => {
    const getsoftdellcar = await Car.find({ deleted: true });
    res.json({ message: "All Soft Deleted resturant", getsoftdellcar })
}





const getallCar = async (req, res) => {
    const allCar = await Car.find();
    res.status(201).json({ message: "All Car", allCar })
}


const getCar = async (req, res) => {
    const Carid = req.params.id;

    // Find the task by ID
    const car = await Car.findById(Carid);


    res.status(201).json({ message: "get Car", car })
}

module.exports = {
    addCar,
    updateCar,
    deleteCar,
    getallCar,
    getCar,
    softdeleteCar,
    getSoftDeleteCar
}