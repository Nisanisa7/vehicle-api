const connection = require('../configs/db')


const getVehicleType = () =>{
    return new Promise((resolve, reject)=>{
     connection.query("SELECT * FROM vehicle_type", (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
module.exports = {
 
    getVehicleType
}