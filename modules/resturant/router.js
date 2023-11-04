
const express  = require("express")
const {addResturant ,updateresturant, deleteresturant,getallresturant,getvisitresturant,softdeleteresturant, getSoftDeleteResturant}  = require("./controller")
//import { addvisitplace } from './controller';


const resturantRouts = express.Router();

resturantRouts.post("/addResturant", addResturant)
resturantRouts.patch("/updateresturant/:id", updateresturant)
resturantRouts.delete("/deleteresturant/:id", deleteresturant)
resturantRouts.get("/getallresturant", getallresturant)
resturantRouts.get("/getSoftDeleteResturant", getSoftDeleteResturant)
resturantRouts.get("/getresturant/:id", getvisitresturant)
resturantRouts.put("/softdeleteresturant/:id", softdeleteresturant)
//export default visitRouts;
module.exports = resturantRouts