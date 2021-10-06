const connection = require('../configs/db')
const vehicleTypeModel = require('../models/Mvehicletype')
const helpers = require('../helpers/helpers')

const getVehicleType = (req, res, next) =>{
    vehicleTypeModel.getVehicleType()
    .then((result)=>{
        const category = result
        helpers.response(res, category, 200)
    })
    .catch((error)=>{
        console.log(error);``
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}

module.exports ={
    getVehicleType
}