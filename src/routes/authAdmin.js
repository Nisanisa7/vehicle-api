const express = require('express')
const router = express.Router()
const authAdminController = require('../controllers/C_AuthAdmin')

router 
.post('/login', authAdminController.Login)
.post('/register', authAdminController.Register)
.get('/verification/:token', authAdminController.Activation)


module.exports = router