const soldProductsModel = require("../database/models/soldProducts.model");

const sellerModel = require('../database/models/seller.model')

class SoldProducts {
//   static allPosts = async (req, res) => {
//     try {
//       const posts = await postModel.find().sort({createdAt:-1});

//       res.status(200).send({
//         apiStatus: true,
//         data: posts,
//         message: "all posts fetched",
//       });
      
//     } catch (e) {
//       res.status(500).send({
//         apiStatus: false,
//         message: e.message,
//       });
//     }
//   };
  static addProduct = async (req, res) => {
    try {
      const sellerProducts = await soldProductsModel.find({sellerId:req.seller._id})
      if(sellerProducts){
        let index = sellerProducts.findIndex(product=>product.productName == req.body.productName && product.yearOfSold == req.body.yearOfSold)
        if(index>=0){
            throw new Error("the product has been added before")
        }
      }
      const productData = new soldProductsModel({
        ...req.body,
        sellerId: req.seller._id,
        sellerName: req.seller.name,
        location:req.seller.location
      });
      await productData.save();
      res.status(200).send({
        apiStatus: true,
        data: productData,
        message: "product added by seller",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static mySoldProducts = async (req, res) => {
    try {
      await req.seller.populate("mySoldProducts");

      res.status(200).send({
        apiStatus: true,
        data: req.seller.mySoldProducts,
        message: "seller products fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

//   static deletePost = async (req, res) => {
//     try {
//       await postModel.findOneAndDelete({
//         _id: req.params.id,
//         userId: req.user._id,
//       });
//       await req.user.populate("myPosts");
//       await req.user.save();
//       res.status(200).send({
//         apiStatus: true,
//         data: req.user.myPosts,
//         message: "post deleted",
//       });
//     } catch (e) {
//       res.status(500).send({
//         apiStatus: false,
//         data: e,
//         message: e.message,
//       });
//     }
//   };

//   static editPost = async (req, res) => {
//     try {
//       const updates = Object.keys(req.body);
//       const post = await postModel.findOne({
//         _id: req.params.id,
//         userId: req.user._id,
//       });
//       updates.forEach((key) => (post[key] = req.body[key]));
//       await post.save();
//       res.status(200).send({
//         apiStatus: true,
//         data: post,
//         message: "post edited",
//       });
//     } catch (e) {
//       res.status(500).send({
//         apiStatus: false,
//         data: e,
//         message: e.message,
//       });
//     }
//   };

  
}

module.exports = SoldProducts;