const connection = require("../configs/db");
const vehicleModel = require("../models/Mvehicle");
const helpers = require("../helpers/helpers");
var fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "nisanisa",
  api_key: "415693727536492",
  api_secret: "unNAaDTSlWskGqW5JwnitPc6iPA",
});
// -------------------------------------------------------------

// get all

const getAllVehicle = (req, res, next) => {
  const page = parseInt(req.query.page);
  const search = req.query.search || "";
  const sortBy = req.query.sortBy || "vehicle_type.id";
  const sort = req.query.sort || "ASC";
  const limit = parseInt(req.query.limit) || 6;
  const offset = page ? page * limit : 0;
  vehicleModel
    .getAllVehicle(search, sortBy, sort, offset, limit)
    .then((result) => {
      const vehicle = result;
      const totalpages = Math.ceil(vehicle.count / limit);
      res.status(200);
      res.json({
        message: "success",
        totalpages: totalpages,
        limit: limit,
        currentpageNumber: page,
        currentpageSize: result.length,
        totalItems: result.count,
        item: vehicle,
      });
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, null, 500, { message: "internal server error" });
    });
};

// ---------------------------------------------------------------------------------
// get data by id
const getVehicleById = (req, res, next) => {
  const id = req.params.idvehicle;
  vehicleModel
    .getVehicleById(id)
    .then((result) => {
      const vehicle = result;
      helpers.response(res, vehicle, 200);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json({
        message: "internal server error",
      });
    });
};
// ---------------------------------------------------
// --- input vehicle
const insertVehicle = async (req, res, next) => {
  try {
    const { path } = req.file;
    const UploadResponse = await cloudinary.uploader.upload(path, {
      upload_preset: "vehicle",
    });
    const { vehicle_name, description, price, location, status, stock, id } =
      req.body;
    const data = {
      vehicle_name: vehicle_name,
      description: description,
      price: price,
      status: status,
      location: location,
      stock: stock,
      id: id,
      image: UploadResponse.secure_url,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vehicleModel
      .insertVehicle(data)
      .then(() => {
        helpers.response(res, data, 200, {
          message: "Data Successfully Inserted",
        });
      })
      .catch((error) => {
        console.log(error);
        helpers.response(res, null, 500, { message: "internal server error" });
      });
  } catch (error) {}
};
// ---------------------------------------------------------------
// update vehicle
const updateVehicle = async (req, res, next) => {
  try {
    const idvehicle = req.params.idvehicle;
    const { vehicle_name, description, price, status } = req.body;
    const data = {
      vehicle_name: vehicle_name,
      description: description,
      price: price,
      status: status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (req.file) {
        const { path } = req.file;
        const UploadResponse = await cloudinary.uploader.upload(path, {
            upload_preset: "vehicle",
        });
        data.image = UploadResponse.secure_url
    }
    vehicleModel
      .updateVehicle(idvehicle, data)
      .then(() => {
        helpers.response(res, data, 200, {
          message: "Data Successfully Updated",
        });
      })
      .catch((error) => {
        console.log(error);
        helpers.response(res, null, 500, { message: "internal server error" });
      });
  } catch (error) {}
};
//------------------------------------------------
// Delete Product
const deleteVehicle = (req, res) => {
  const idvehicle = req.params.idvehicle;
  vehicleModel
    .deleteVehicle(idvehicle)
    .then(() => {
      res.status(200);
      res.json({
        message: "item has been successfully deleted",
      });
    })
    .catch(() => {
      console.log(err);
      res.status(500);
      res.json({
        message: "internal server error",
      });
    });
};

//=============================================
const getByType = (req, res, next) => {
  const id = req.params.id;
  const page = parseInt(req.query.page);
  const search = req.query.search || "";
  const sortBy = req.query.sortBy || "price";
  const sort = req.query.sort || "ASC";
  const limit = parseInt(req.query.limit) || 6;
  const offset = page ? page * limit : 0;
  vehicleModel
    .getByType(id, search, sortBy, sort, offset, limit)
    .then((result) => {
      const vehicle = result;
      const totalpages = Math.ceil(vehicle.count / limit);
      res.status(200);
      res.json({
        message: "success",
        totalpages: totalpages,
        limit: limit,
        currentpageNumber: page,
        currentpageSize: result.length,
        totalItems: result.count,
        item: vehicle,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json({
        message: "internal server error",
      });
    });
};

module.exports = {
  getAllVehicle,
  getVehicleById,
  insertVehicle,
  updateVehicle,
  deleteVehicle,
  getByType,
};
