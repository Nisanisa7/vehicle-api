const userModel = require('../models/Muser')
const helpers = require('../helpers/helpers')
var fs = require('fs');
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "nisanisa",
  api_key: "415693727536492",
  api_secret: "unNAaDTSlWskGqW5JwnitPc6iPA",
});
const getAllCustommer = (req, res, next) =>{
    const page = parseInt(req.query.page) 
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'idCustommer'
    const sort = req.query.sort|| 'ASC'
    const limit = parseInt(req.query.limit)||10
    const offset = page ? page * limit :0;
    userModel.getAllCustommer(search, sortBy, sort, offset, limit)
    .then((result)=>{
        const custommer = result
        const totalpages = Math.ceil(custommer.count/limit)
   
        res.status(200)
        res.json({
            "message": 'success',
            "totalpages": totalpages,
            "limit": limit,
            "currentpageNumber": page,
            "currentpageSize" : result.length,
            "totalItems" : result.count,
            item: custommer,

        })
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}
const getCustommerByID = (req, res, next) =>{
    const idCustommer = req.params.idCustommer
    userModel.getCustommerID(idCustommer)
    .then((result)=>{
        const custommer = result
        helpers.response(res, custommer, 200, {message: "Showing data user"})
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
const updateCustommer = async(req, res, next) =>{
    try {
        const idCustommer = req.params.idCustommer
        const { display_name, address, phone_number, gender, datebirth} = req.body
        const data = {
            display_name: display_name, 
            address: address, 
            phone_number: phone_number,
            gender: gender,
            datebirth: datebirth,
            updatedAt: new Date()
        }
        if(req.file){
            const { path } = req.file;
            const UploadResponse = await cloudinary.uploader.upload(path, {
            upload_preset: "vehicle",
        });
            data.image = UploadResponse.secure_url
        }
        userModel.updateCustommer(idCustommer, data)
        .then(()=>{
        helpers.response(res, data, 200, {message: "Data Successfully Updated"})
        })
        .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
        })
    } catch (error) {
        
    }
   
} 

//================================================
const getAdmin = (req, res)=>{
    userModel.getAllAdmin()
    .then((result)=>{
        const admin = result
        console.log(admin);
        helpers.response(res, admin, 200, {message: "Showing data user"})
    })
    .catch((error)=>{
        console.log(error);
        helpers.response(res, null, 500, {message: 'internal server error'})
    })
}
const getAdminByID = (req, res, next) =>{
    const idAdmin = req.params.idAdmin
    userModel.getAdminID(idAdmin)
    .then((result)=>{
        const admin = result
        helpers.response(res, admin, 200, {message: "Showing data user"})
    })
    .catch((error)=>{
        console.log(error);
        res.status(500)
        res.json({
            message: 'internal server error'
        })
    })
}
const updateAdmin = async(req, res, next) =>{
    try {
        const idAdmin = req.params.idAdmin
        const {display_name, address, phone_number, gender, datebirth} = req.body
        const data = {
          display_name: display_name, 
          address: address, 
          phone_number: phone_number,
          gender: gender,
          datebirth: datebirth,
          updatedAt: new Date()
        }
        if(req.file){
        const { path } = req.file;
        const UploadResponse = await cloudinary.uploader.upload(path, {
            upload_preset: "vehicle",
        });
        data.image = UploadResponse.secure_url
        }
        userModel.updateAdmin(idAdmin, data)
        .then(()=>{
            helpers.response(res, data, 200, {message: "Data Successfully Updated"})
        })
        .catch((err)=>{
            console.log(err);
            helpers.response(res, null, 500, {message: 'internal server error'})
        })
        // if(!req.file){
        //     profile = ""
        // } else {
        //     const { path } = req.file;
        //     const UploadResponse = await cloudinary.uploader.upload(path, {
        //         upload_preset: "blanja",
        //     });
        //     imageUserInput = UploadResponse.secure_url
        // }
   
        // userModel.getAdminID(idAdmin)
        // .then((result)=>{
        //     const oldImageProfile = result[0].image
        //     const newImageProfile = UploadResponse.secure_url
        //     const {display_name, address, phone_number, gender, datebirth} = req.body
        //     if(imageUserInput == ""){
        //         profile = oldImageProfile
        //     } else {
        //         profile = newImageProfile
        //     }
        //     const data = {
        //         display_name: display_name, 
        //         address: address, 
        //         phone_number: phone_number,
        //         gender: gender,
        //         datebirth: datebirth,
        //         image: profile,
        //         updatedAt: new Date()
        //     }
        //     console.log(data);
        //     userModel.updateAdmin(idAdmin, data)
        //     .then(()=>{
        //         helpers.response(res, data, 200, {message: "Data Successfully Updated"})
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //         helpers.response(res, null, 500, {message: 'internal server error'})
        //         // fs.unlink(
        //         //     `./uploads/${req.file.filename}`, (err =>{
        //         //         if(err){
        //         //             console.log(err);
        //         //         }
        //         //     })
        //         // )
        //     })
        // })
    } catch (error) {
        
    }
   
} 
module.exports = {
    // getAllSeller,
    // updateSeller,
    // getAdminByID,

    getAllCustommer,
    getCustommerByID,
    updateCustommer,

    getAdmin,
    getAdminByID,
    updateAdmin,
}