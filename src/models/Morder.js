const connection = require('../configs/db')
const getOrderById =(id)=>{
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM booking where idbooking = ?",id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
   //======================================================== 
 const getOrderByCust =(id)=>{
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM booking where idCustommer = ?",id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
 //======================================================== 
 const getAllOrder = (search, sortBy, sort,offset, limit) =>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM booking') 
        connection.query(`SELECT * FROM booking INNER JOIN custommer on booking.idCustommer = custommer.idCustommer WHERE booking.status LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
// ========================================================
const insertOrder = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO booking SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

 module.exports = {
    getAllOrder,
    insertOrder,
    // updateOrder,
    // deleteOrder,
    getOrderById,
    // cancelOrder,
    getOrderByCust
}