
const express  = require("express")
const {addEvent ,updateEvent, deleteEvent,getallEvnets,getEvent,softdeleteEvent, getSoftDeleteEvent}  = require("./controller")
//import { addvisitplace } from './controller';


const EventRouts = express.Router();

EventRouts.post("/addEvent", addEvent)
EventRouts.patch("/updateEvent/:id", updateEvent)
EventRouts.delete("/deleteEvent/:id", deleteEvent)
EventRouts.get("/getallEvents", getallEvnets)
EventRouts.get("/getSoftDeleteEvents", getSoftDeleteEvent)
EventRouts.get("/getEvent/:id", getEvent)
EventRouts.put("/softdeleteEvent/:id", softdeleteEvent)
//export default visitRouts;
module.exports = EventRouts