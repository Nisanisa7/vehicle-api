const connection = require('../configs/db')


const findUser = (email) =>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM custommer where email = ?', email, (error, result)=>{
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
        connection.query('INSERT INTO custommer SET ?', data, (error, result)=>{
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
        connection.query(`UPDATE custommer SET status = 'Active' where email = ?`, email, (error, result)=>{
            if(!error){
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getPayLoad = ( data) =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM custommer where email= ? `, data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
// const checkStatus = () =>{
//     return new Promise((resolve, reject)=>{
//         connection.query(`SELECT status FROM custommer where status = 'Active' `, (error, result)=>{
//             if(!error){
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     })

// }
//

module.exports ={
    findUser,
    Register,
    updateStatus,
    getPayLoad
    // checkStatus
}