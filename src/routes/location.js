const express = require('express')
const router = express.Router()
const LocationController = require('../controllers/C_location')


router

.get('/',   LocationController.getAllLocation)


module.exports = router