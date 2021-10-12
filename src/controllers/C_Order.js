const connection = require('../configs/db')
const orderModel = require('../models/Morder')
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helpers/helpers')

const getOrderById = (req, res, next)=>{
    const id = req.params.idbooking
   orderModel.getOrderById(id)
    .then((result)=>{
        const order = result
        res.status(200)
        res.json({
            message: 'success',
            data: order
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
//=========================================
const getOrderByCust = (req, res, next)=>{
    const idCustommer = req.params.idCustommer
   orderModel.getOrderByCust(idCustommer)
    .then((result)=>{
        const order = result
        res.status(200)
        res.json({
            message: 'success',
            data: order
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
//get data from database ===============================
const getAllOrder = (req, res, next) =>{
    const page = req.query.page || 1
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'idBooking'
    const sort = req.query.sort|| 'ASC'
    const limit = req.query.limit || 5
    const offset = (page-1) * limit
    orderModel.getAllOrder(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const order = result
        res.status(200)
        res.json({
            message: 'success',
            data: order
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: error
        })
    })
}
// INSERT DATA TO DB =======================================
const insertOrder = (req, res, next)=>{
    const {idCustommer, vehicle_name, totalprice, amount, rentalDay, image_order, reservationDate, payment} = req.body
    const data = {
        idbooking: uuidv4(),
        idCustommer : idCustommer,
        vehicle_name : vehicle_name,
        totalprice : totalprice,
        amount : amount,
        rentalDay : rentalDay,
        image_order : image_order,
        reservationDate : reservationDate,
        payment :payment,
        status_order: "Waiting confirmation",
    }
   orderModel.insertOrder(data)
    .then(()=>{
        res.json({
            message: 'data berhasil di insert',
            data: data
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message:'internal server error'
        })
    })
}
const deleteOrder = (req, res, next) =>{
    const idbooking = req.params.idbooking
    orderModel.deleteOrder(idbooking)
    .then(()=>{
        res.status(200)
        res.json({
            message:  'item has been successfully deleted'
        })
    })
    .catch(()=>{
        console.log(err);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
const updateOrder = (req, res, next)=>{
    const idbooking = req.params.idbooking
    const {status_order} = req.body
    const data = {
        status_order : status_order,
    }
    console.log(data);
    orderModel.updateOrder(data, idbooking)
    .then(()=>{
        helpers.response(res, data, 200, {message: "Data Successfully updated"})
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}

module.exports = {
    getAllOrder,
    insertOrder,
    updateOrder,
    // deleteOrder,
    getOrderById,
    // cancelOrder,
    getOrderByCust,
    deleteOrder
}