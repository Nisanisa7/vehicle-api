const express = require('express')
const router = express.Router()
const orderController = require('../controllers/C_Order')

router
.get('/', orderController.getAllOrder)
.get('/:idbooking', orderController.getOrderById)
.get('/custommer/:idCustommer', orderController.getOrderByCust)
.post('/', orderController.insertOrder)
.patch('/:idbooking', orderController.updateOrder)
.delete('/:idbooking',  orderController.deleteOrder)
module.exports = router