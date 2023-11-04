
const VisitPlace = require("../../connectionDB/visitplace.schema")
const addvisitplace = async (req, res) => {

    let { visitName, email, address, phone, location, price } = req.body;
    let addPlace = await VisitPlace.insertMany({ visitName, email, address, phone, location, price })

    res.status(201).json({ message: "Added Success", addPlace })


}

const updatevisitplace = async (req, res) => {
    const visitid = req.params.id;
    let updatedVisit = await VisitPlace.findByIdAndUpdate(visitid, {
        visitName: req.body.visitName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location, price: req.body.price
    }, { new: true })
    res.json({ message: "Update Sucess", updatedVisit })
}

const deletevisitplace = async (req, res) => {
    try {
        const placeid = req.params.id;

        // Find the place by ID
        const place = await VisitPlace.findById(placeid);
        if (!place) {
            return res.status(404).json({ error: 'place not found' });
        }

        // Delete the place using its ID
        const deletedplace = await VisitPlace.findByIdAndDelete(placeid);
        if (!deletedplace) {
            return res.status(404).json({ error: 'place not found' });
        }

        res.json({ message: 'Deleted successfully', deletedplace });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeletePlace = async (req, res) => {
    const placeid = req.params.id;

        // Find the place by ID
        const place = await VisitPlace.findById(placeid);
        if (!place) {
            return res.status(404).json({ error: 'place not found' });
        }
        const placevisit = await VisitPlace.findById(placeid);
        placevisit.deleted = true
        await placevisit.save();
        res.json({ message: "Soft Deleted Success" })
    

}
const getSoftDelete = async (req, res) => {
    const getsoftdellPlace = await VisitPlace.find({ deleted: true });
    res.json({ message: "All Soft Deleted Places", getsoftdellPlace })
}





const getallvisitplace = async (req, res) => {
    const allplace = await VisitPlace.find();
    res.status(201).json({ message: "All Places", allplace })
}


const getvisitplace = async (req, res) => {
    const placeid = req.params.id;

    // Find the task by ID
    const place = await VisitPlace.findById(placeid);
  

    res.status(201).json({ message: "get place", place })
}

module.exports = {
    addvisitplace,
    updatevisitplace,
    deletevisitplace,
    getallvisitplace,
    getvisitplace,
    softdeletePlace,
    getSoftDelete
}