const connection = require('../configs/db')



const findAdmin = (email) =>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM admin where email = ?', email, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const Register = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO admin SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const updateStatus = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE admin SET status = 'Active' where email = ?`, email, (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


module.exports ={
    findAdmin,
    Register,
    updateStatus
}