
const express  = require("express")
const {addvisitplace ,updatevisitplace, deletevisitplace,getallvisitplace,getvisitplace,softdeletePlace, getSoftDelete}  = require("./controller")
//import { addvisitplace } from './controller';


const visitRouts = express.Router();

visitRouts.post("/addvisitplace", addvisitplace)
visitRouts.patch("/updatevisitplace/:id", updatevisitplace)
visitRouts.delete("/deletevisitplace/:id", deletevisitplace)
visitRouts.get("/getallvisitplace", getallvisitplace)
visitRouts.get("/getSoftDeletePlaces", getSoftDelete)
visitRouts.get("/getvisitplace/:id", getvisitplace)
visitRouts.put("/softdeletePlace/:id", softdeletePlace)
//export default visitRouts;
module.exports = visitRouts