const connection = require('../configs/db')



const getAllLocation= (search, sortBy, sort, offset, limit)=>{
    return new Promise((resolve, reject)=>{
        const queryqount = ('SELECT count(*) as numRows FROM location')
        connection.query(`SELECT * FROM location WHERE city LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getAllLocation
}