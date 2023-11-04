
const Event = require("../../connectionDB/event.schema")
const addEvent = async (req, res) => {

    let { eventName, email, address, phone, location ,organizer ,price } = req.body;
    let addEvent= await Event.insertMany({ eventName, email, address, phone, location ,organizer ,price })

    res.status(201).json({ message: "Added Success", addEvent })


}

const updateEvent = async (req, res) => {
    const eventid = req.params.id;
    let updatedEvent = await Event.findByIdAndUpdate(eventid, {
        eventName: req.body.eventName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location , organizer: req.body.organizer , price:req.body.price
    }, { new: true })
    res.json({ message: "Update Sucess", updatedEvent })
}

const deleteEvent = async (req, res) => {
    try {
        const eventid = req.params.id;

        // Find the place by ID
        const event = await Event.findById(eventid);
        if (!event) {
            return res.status(404).json({ error: 'event not found' });
        }

        // Delete the place using its ID
        const deleteEvent = await Event.findByIdAndDelete(event);
        if (!deleteEvent) {
            return res.status(404).json({ error: 'event not found' });
        }

        res.json({ message: 'Deleted successfully', deleteEvent });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteEvent = async (req, res) => {
    const eventid = req.params.id;

    // Find the place by ID
    const event = await Event.findById(eventid);
    if (!event) {
        return res.status(404).json({ error: 'event not found' });
    }
    const softEvent = await Event.findById(event);
    softEvent.deleted = true
    await softEvent.save();
    res.json({ message: "Soft Deleted Success" })


}
const getSoftDeleteEvent = async (req, res) => {
    const getsoftdellEventes = await Event.find({ deleted: true });
    res.json({ message: "All Soft Deleted Events", getsoftdellEventes })
}





const getallEvnets = async (req, res) => {
    const allEvents = await Event.find();
    res.status(201).json({ message: "All Events", allEvents })
}


const getEvent = async (req, res) => {
    const eventid = req.params.id;

    // Find the task by ID
    const event = await Event.findById(eventid);


    res.status(201).json({ message: "get event", event })
}

module.exports = {
    addEvent,
    updateEvent,
    deleteEvent,
    getallEvnets,
    getEvent,
    softdeleteEvent,
    getSoftDeleteEvent
}