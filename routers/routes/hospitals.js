const express = require("express");
const {getAllHospitals , addHospital } = require("./../controllers/hospitals")

const hospitalRouter = express.Router()

hospitalRouter.get("/" , getAllHospitals )
hospitalRouter.post("/" , addHospital )


module.exports=hospitalRouter