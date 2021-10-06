const express = require('express')
const router = express.Router()
const cardControl = require('../controllers/Ccard')



router
.get('/', cardControl.getCard)


module.exports = router