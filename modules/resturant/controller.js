
const Resturant = require("../../connectionDB/resturant.schema")
const addResturant = async (req, res) => {

    let { restName, email, address, phone, location } = req.body;
    let addresturant = await Resturant.insertMany({ restName, email, address, phone, location })

    res.status(201).json({ message: "Added Success", addresturant })


}

const updateresturant = async (req, res) => {
    const resturantid = req.params.id;
    let updatedResturant = await Resturant.findByIdAndUpdate(resturantid, {
        restName: req.body.restName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location
    }, { new: true })
    res.json({ message: "Update Sucess", updatedResturant })
}

const deleteresturant = async (req, res) => {
    try {
        const resturantid = req.params.id;

        // Find the place by ID
        const resturant = await Resturant.findById(resturantid);
        if (!resturant) {
            return res.status(404).json({ error: 'place not found' });
        }

        // Delete the place using its ID
        const deletedresturant = await Resturant.findByIdAndDelete(resturantid);
        if (!deletedresturant) {
            return res.status(404).json({ error: 'place not found' });
        }

        res.json({ message: 'Deleted successfully', deletedresturant });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteresturant = async (req, res) => {
    const resturantid = req.params.id;

    // Find the place by ID
    const resturant = await Resturant.findById(resturantid);
    if (!resturant) {
        return res.status(404).json({ error: 'place not found' });
    }
    const softresturant = await Resturant.findById(resturant);
    softresturant.deleted = true
    await softresturant.save();
    res.json({ message: "Soft Deleted Success" })


}
const getSoftDeleteResturant = async (req, res) => {
    const getsoftdellresturant = await Resturant.find({ deleted: true });
    res.json({ message: "All Soft Deleted resturant", getsoftdellresturant })
}





const getallresturant = async (req, res) => {
    const allresturant = await Resturant.find();
    res.status(201).json({ message: "All resturant", allresturant })
}


const getvisitresturant = async (req, res) => {
    const resturantid = req.params.id;

    // Find the task by ID
    const resturant = await Resturant.findById(resturantid);


    res.status(201).json({ message: "get place", resturant })
}

module.exports = {
    addResturant,
    updateresturant,
    deleteresturant,
    getallresturant,
    getvisitresturant,
    softdeleteresturant,
    getSoftDeleteResturant
}