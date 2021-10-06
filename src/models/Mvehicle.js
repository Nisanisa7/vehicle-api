const connection = require('../configs/db')



const getAllVehicle = (search, sortBy, sort, offset, limit)=>{
    return new Promise((resolve, reject)=>{
        const queryqount = ('SELECT count(*) as numRows FROM vehicle')
        connection.query(`SELECT * FROM vehicle INNER JOIN vehicle_type on vehicle.id= vehicle_type.id
        WHERE vehicle.vehicle_name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
const getVehicleById = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM vehicle where idvehicle = ?", id, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const getByType = (id, search, sortBy, sort, offset, limit)=>{
    return new Promise((resolve, reject)=>{
        const queryqount = ('SELECT count(*) as numRows FROM vehicle')
        connection.query(`SELECT * FROM vehicle where id = ? ORDER BY ${sortBy} ${sort}`, [id, search, offset, limit], (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}


const insertVehicle = (data) =>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO vehicle SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateVehicle = (idvehicle, data) =>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE vehicle SET ? WHERE idvehicle = ?', [data, idvehicle], (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const deleteVehicle = (idvehicle)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM vehicle where idvehicle = ?', idvehicle, (error, result)=>{
            if (!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

// const getByCategory = (type, search, sortBy, sort, offset, limit) =>{
//     return new Promise((resolve, reject)=>{
//         const queryqount = ('SELECT count(*) as numRows FROM vehicle')
//         connection.query(`SELECT vehicle.idvehicle, vehicle_type.id, vehicle.vehicle_name, vehicle_type.name,
//                         vehicle.description, vehicle.status, vehicle.location, vehicle.image, vehicle.stock FROM vehicle INNER JOIN  vehicle_type on vehicle.id= vehicle_type.id
//                         WHERE (vehicle_type.name = '${type}') AND (vehicle.vehicle_name LIKE '%${search}%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?, `, [search, offset, limit, type], (error, result)=>{
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     })
// }

module.exports = {
    getAllVehicle,
    getVehicleById,
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    getByType,
    // getByCategory
   
}