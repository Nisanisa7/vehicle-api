const connection = require('../configs/db')
const cardModel = require('../models/Mcard')
const helpers = require('../helpers/helpers')

const getCard = (req, res) =>{
  const data = [
      {
          category: id[0], 
          result :[{id: idvehicle, name: name_vehicle, description: description, location: location, price: price, image: image, stock : stock}]
      },
      {
        category: id[1], 
        result :[{id: idvehicle, name: name_vehicle, description: description, location: location, price: price, image: image, stock : stock}]
      },
      {
          
          category: id[2], 
          result :[{id: idvehicle, name: name_vehicle, description: description, location: location, price: price, image: image, stock : stock}]
      }
    ]
  cardModel.getCard([data])
  console.log(data);

}






module.exports ={
   getCard
}