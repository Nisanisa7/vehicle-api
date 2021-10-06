const express = require('express')
const router = express.Router()
const Cvehicle_type = require('../controllers/vehicleTypeController')

router
.get('/', Cvehicle_type.getVehicleType)



module.exports = router