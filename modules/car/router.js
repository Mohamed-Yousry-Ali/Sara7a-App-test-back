
const express  = require("express")
const { addCar, updateCar, deleteCar, getallCar, getSoftDeleteCar, getCar, softdeleteCar }  = require("./controller")
//import { addvisitplace } from './controller';


const carRouts = express.Router();

carRouts.post("/addCar", addCar)
carRouts.patch("/updateCar/:id", updateCar)
carRouts.delete("/deleteCar/:id", deleteCar)
carRouts.get("/getallCar", getallCar)
carRouts.get("/getSoftDeleteCar", getSoftDeleteCar)
carRouts.get("/getCar/:id", getCar)
carRouts.put("/softdeleteCar/:id", softdeleteCar)
//export default visitRouts;
module.exports = carRouts