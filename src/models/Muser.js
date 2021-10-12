const connection = require("../configs/db");

const getAllCustommer = (search, sortBy, sort, offset, limit) => {
  return new Promise((resolve, reject) => {
    const queryCount = "SELECT count(*) as numRows FROM custommer";
    connection.query(
      `SELECT * FROM custommer WHERE  name LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`,
      [search, offset, limit],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
const getCustommerID = (idCustommer) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM custommer where idCustommer = ?",
      idCustommer,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const updateCustommer = (idCustommer, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE custommer SET ? WHERE idCustommer = ?",
      [data, idCustommer],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

//===================================================================
const getAllAdmin = () =>{
  return new Promise((resolve, reject)=>{
      // const queryCount = ('SELECT count(*) as numRows FROM admin') 
      connection.query(`SELECT * FROM admin`, (error, result)=>{
          if (!error) {
              resolve(result)
          } else {
              reject(error)
          }
      })
  })
}
const getAdminID = (idAdmin) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM admin where idAdmin = ?",
      idAdmin,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
const updateAdmin = (idAdmin, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE admin SET ? WHERE idAdmin = ?",
      [data, idAdmin],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
    // getAllSeller,
    // updateSeller,
    // getSellerID,


    getAllCustommer,
    getCustommerID,
    updateCustommer,

    getAllAdmin,
    getAdminID,
    updateAdmin
    
}