const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')
// const auth = require('../middleware/auth')
// const redis = require("../middleware/redis")

router

.get('/',   vehicleController.getAllVehicle)
.get('/:idvehicle', vehicleController.getVehicleById)
.get('/type/:id', vehicleController.getByType)
.post('/', upload.single('image'), vehicleController.insertVehicle)
.patch('/:idvehicle', upload.single('image'), vehicleController.updateVehicle)
.delete('/:idvehicle', vehicleController.deleteVehicle)


module.exports = router