const express = require('express')
const router = express.Router()
const authCustController = require('../controllers/C_AuthCust')

router 
.post('/login', authCustController.Login)
.post('/register', authCustController.Register)
.get('/verification/:token', authCustController.userActivation)

.get('/checktoken', authCustController.CheckToken)
.post('/profile', authCustController.Profile)
.get('/logout', authCustController.Logout)

module.exports = router