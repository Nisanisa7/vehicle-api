const connection = require('../configs/db')
const LocationModel = require('../models/M_location')
const helpers = require('../helpers/helpers')

const getAllLocation = (req, res, next)=>{
    const page = parseInt(req.query.page)
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'city'
    const sort = req.query.sort || 'ASC'
    const limit = parseInt(req.query.limit) || 4
    const offset = page ? page * limit :0;
    LocationModel.getAllLocation(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const location= result
        const totalpages = Math.ceil(location.count/limit)
        res.status(200)
        res.json({
            "message": 'success',
            "totalpages": totalpages,
            "limit": limit,
            "currentpageNumber": page,
            "currentpageSize" : result.length,
            "totalItems" : result.count,
            item: location,

        })
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
   
}

module.exports = {
    getAllLocation
}