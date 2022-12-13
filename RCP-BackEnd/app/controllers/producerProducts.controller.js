const producerProductsModel = require("../database/models/producerProducts.model");

class ProducedProducts {

  static addProduct = async (req, res) => {
    try {
      const producerProducts = await producerProductsModel.find({
        producerId: req.producer._id,
      });
      if (producerProducts) {
        let index = producerProducts.findIndex(
          (product) =>
            product.productName == req.body.productName &&
            product.yearOfProduction == req.body.yearOfProduction
        );
        if (index >= 0) {
          throw new Error("the product has been added before");
        }
      }
      const productData = new producerProductsModel({
        ...req.body,
        producerId: req.producer._id,
        producerName: req.producer.name,
        location: req.producer.location,
      });
      await productData.save();
      res.status(200).send({
        apiStatus: true,
        data: productData,
        message: "product added by producer",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static myProducedProducts = async (req, res) => {
    try {
      await req.producer.populate("myProducts");
      res.status(200).send({
        apiStatus: true,
        data: req.producer.myProducts,
        message: "producer products fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static totalAgricultureProducedProductsByLocation = async (req, res) => {
    try {
      const producedProducts = await producerProductsModel.find();
      let agriculture = {};
      let newProduct = [];
      producedProducts.forEach((producedProduct) => {
        if (producedProduct.category == "agriculture" && req.body.location == producedProduct.location) {
          if (agriculture.hasOwnProperty(producedProduct.yearOfProduction)) {
           
            for(let i = 0 ; i<agriculture[producedProduct.yearOfProduction].length ; i++){
              if(producedProduct.productName == agriculture[producedProduct.yearOfProduction][i].productName){
                agriculture[producedProduct.yearOfProduction][i].quantity += producedProduct.quantity
                break;
              }
              else if(i==agriculture[producedProduct.yearOfProduction].length-1){
                let temp={
                  productName: producedProduct.productName,
                  quantity: producedProduct.quantity,
                } 
                agriculture[producedProduct.yearOfProduction].push(temp) 
                temp = {};
                break;
              }
            }
          }
           else {
            newProduct.push({
              productName: producedProduct.productName,
              quantity: producedProduct.quantity,
            }) 
            agriculture[producedProduct.yearOfProduction] = newProduct;
            newProduct = [];
          
          }
        }
      });

      res.status(200).send({
        apiStatus: true,
        data: agriculture,
        message: "producers agriculture products fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static totalDiaryProducedProductsByLocation = async (req, res) => {
    try {
      const producedProducts = await producerProductsModel.find();
      let diary={}
      let newProduct = [];
      producedProducts.forEach((producedProduct) => {
        if (producedProduct.category == "diary" && req.body.location == producedProduct.location) {
          if (diary.hasOwnProperty(producedProduct.yearOfProduction)) {
            
            for(let i = 0 ; i<diary[producedProduct.yearOfProduction].length ; i++){
              if(producedProduct.productName == diary[producedProduct.yearOfProduction][i].productName){
                diary[producedProduct.yearOfProduction][i].quantity += producedProduct.quantity
                break;
              }
              else if(i==diary[producedProduct.yearOfProduction].length-1){
                let temp={
                  productName: producedProduct.productName,
                  quantity: producedProduct.quantity,
                } 
                diary[producedProduct.yearOfProduction].push(temp) 
                temp = {};
                break;
              }
            }
          }
           else {
            newProduct.push({
              productName: producedProduct.productName,
              quantity: producedProduct.quantity,
            }) 
            diary[producedProduct.yearOfProduction] = newProduct;
            newProduct = [];
          
          }
        }
      });

      res.status(200).send({
        apiStatus: true,
        data: diary,
        message: "producers diary products fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  
  static totalProteinProducedProductsByLocation = async (req, res) => {
    try {
      const producedProducts = await producerProductsModel.find();
      let protein={}
      let newProduct = [];
      producedProducts.forEach((producedProduct) => {
        if (producedProduct.category == "protein" && req.body.location == producedProduct.location) {
          if (protein.hasOwnProperty(producedProduct.yearOfProduction)) {
            
            for(let i = 0 ; i<protein[producedProduct.yearOfProduction].length ; i++){
              if(producedProduct.productName == protein[producedProduct.yearOfProduction][i].productName){
                protein[producedProduct.yearOfProduction][i].quantity += producedProduct.quantity
                break;
              }
              else if(i==protein[producedProduct.yearOfProduction].length-1){
                let temp={
                  productName: producedProduct.productName,
                  quantity: producedProduct.quantity,
                } 
                protein[producedProduct.yearOfProduction].push(temp) 
                temp = {};
                break;
              }
            }
          }
           else {
            newProduct.push({
              productName: producedProduct.productName,
              quantity: producedProduct.quantity,
            }) 
            protein[producedProduct.yearOfProduction] = newProduct;
            newProduct = [];
          
          }
        }
      });

      res.status(200).send({
        apiStatus: true,
        data: protein,
        message: "producers protein products fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

    static deleteProducedProduct = async (req, res) => {
      try {
        await producerProductsModel.findOneAndDelete({
          _id: req.params.id,
          producerId: req.producer._id,
        });
        await req.producer.populate("myProducts");
        await req.producer.save();
        res.status(200).send({
          apiStatus: true,
          data: req.producer.myProducts,
          message: "produced product deleted",
        });
      } catch (e) {
        res.status(500).send({
          apiStatus: false,
          data: e,
          message: e.message,
        });
      }
    };

    static editProducedProduct = async (req, res) => {
      try {
        const updates = Object.keys(req.body);
        const product = await producerProductsModel.findOne({
          _id: req.params.id,
          producerId: req.producer._id,
        });
        
        const myProducts = await producerProductsModel.find({ producerId: req.producer._id,});
        updates.forEach((key) => (product[key] = req.body[key]));
      
        myProducts.forEach(myProduct=>{
         if(myProduct.productName==product.productName && myProduct.yearOfProduction == product.yearOfProduction){
          throw new Error("this product has entered before in the same year")
         }
        })
      
        await product.save();
        res.status(200).send({
          apiStatus: true,
          data: product,
          message: "produced product edited",
        });
      } catch (e) {
        res.status(500).send({
          apiStatus: false,
          data: e,
          message: e.message,
        });
      }
    };
}

module.exports = ProducedProducts;
