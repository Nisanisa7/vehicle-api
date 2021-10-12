const express = require('express')
const router = express.Router()
const userController = require('../controllers/Cuser')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

router 
    .get('/', userController.getAllCustommer)
    .get('/:idCustommer', userController.getCustommerByID)
    .patch('/:idCustommer', upload.single('image'), userController.updateCustommer)
    

    .get('/user/', userController.getAdmin)
    .get('/admin/:idAdmin', userController.getAdminByID)
    .patch('/admin/:idAdmin', upload.single('image'), userController.updateAdmin)

module.exports = router