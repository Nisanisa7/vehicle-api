const express = require('express')
const route = express.Router()
const vehicleRouter = require('./vehicle')
const vehicleTypeRoute = require('./vehicle_type')
const cardRouter = require('./card')
const authCustommer = require('./authCustommer')
const authAdmin = require('./authAdmin')
const locationRoute = require('./location')
const userRouter = require('./user')
const orderRoute = require('./order')
route

    .use('/vehicle', vehicleRouter)
    .use('/vehicle_type', vehicleTypeRoute)
    .use('/card', cardRouter)
    .use('/authcust', authCustommer)
    .use('/authadmin', authAdmin)
    .use('/location', locationRoute)
    .use('/user', userRouter)
    .use('/order', orderRoute)



module.exports = route