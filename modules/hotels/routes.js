
const express  = require("express")
const {addHotel ,updateHotel, deleteHotel,getallHotels,getHotel,softdeleteHotel, getSoftDeleteHotels}  = require("./controller")
//import { addvisitplace } from './controller';


const hotelRouts = express.Router();

hotelRouts.post("/addHotel", addHotel)
hotelRouts.patch("/updateHotel/:id", updateHotel)
hotelRouts.delete("/deleteHotel/:id", deleteHotel)
hotelRouts.get("/getallHotels", getallHotels)
hotelRouts.get("/getSoftDeleteHotels", getSoftDeleteHotels)
hotelRouts.get("/getHotel/:id", getHotel)
hotelRouts.put("/softdeleteHotel/:id", softdeleteHotel)
//export default visitRouts;
module.exports = hotelRouts