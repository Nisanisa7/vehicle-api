const express = require('express')
const router = express.Router()
const userController = require('../controllers/Cuser')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

router 
    .get('/', userController.getAllCustommer)
    .get('/:idCustommer', userController.getCustommerByID)
    .patch('/:idCustommer', upload.single('image'), userController.updateCustommer)

module.exports = router