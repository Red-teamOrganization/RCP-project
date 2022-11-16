const User = require("../database/models/user.model");
const Products = require("../database/models/producerProducts.model")
const Consumed = require("../database/models/soldProducts.model");

class Home {
  static honorList = async (req, res) => {
    try {
      let users = await User.find();
      const filtered = users.filter(user=> user.userType === "producer" || user.userType === "seller")
      filtered.sort((a, b) =>  b.numberOfDonations - a.numberOfDonations);

      res.status(200).send({
        apiStatus: true,
        data: filtered,
        message: "seller and producers on honor list fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static allCharities = async (req, res) => {
    try {
      let charities = await User.find({userType:"charity"});
      res.status(200).send({
        apiStatus: true,
        data: charities,
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        date: e,
        message: e.message,
      });
    }
  };
  
 static allStatics = async (req ,res) =>{
  try{
    let producedProducts = await Products.find()
    let soldProducts = await Consumed.find()
 
    let totalProducedAgriculture = 0
    let totalProducedDiary = 0
    let totalProducedProtein = 0
 
    producedProducts.forEach(product=>{
     if(product.category == "agriculture"){
       totalProducedAgriculture+=product.quantity
     }
     else if (product.category == "diary"){
       totalProducedDiary+=product.quantity
     }
     else {
       totalProducedProtein += product.quantity
     }
    })
 
    let totalSoldAgriculture = 0
    let totalSoldDiary = 0
    let totalSoldProtein = 0
 
    soldProducts.forEach(product=>{
     if(product.category == "agriculture"){
       totalSoldAgriculture+=product.quantity
     }
     else if (product.category == "diary"){
       totalSoldDiary+=product.quantity
     }
     else {
       totalSoldProtein += product.quantity
     }
    })
    let productionObj = {
      "agriculture":totalProducedAgriculture,
      "protein":totalProducedProtein,
      "diary":totalProducedDiary
    }
    let consumptionObj = {
      "agriculture":totalSoldAgriculture,
      "protein":totalSoldProtein,
      "diary":totalSoldDiary
    }
    res.status(200).send({
     apiStatus: true,
     data: {productionObj , consumptionObj},
     message:"whole statics fetched"
   });
  }
  catch(e){
    res.status(500).send({
      apiStatus: false,
      date: e,
      message: e.message,
    });
  }
   
 }



 static totalMarketInsights = async (req, res) => {
  try {
    const soldProducts = await Consumed.find();
    const producedProducts = await Products.find();
    let agriculture = {};
    let newAgricultureProduct = [];
   
    soldProducts.forEach((soldProduct) => {
      if (soldProduct.category == "agriculture" ) {
        if (agriculture.hasOwnProperty(soldProduct.yearOfSold)) {
         
          for(let i = 0 ; i<agriculture[soldProduct.yearOfSold].length ; i++){
            if(soldProduct.productName == agriculture[soldProduct.yearOfSold][i].productName){
              agriculture[soldProduct.yearOfSold][i].consumption += soldProduct.quantity
              break;
            }
            else if(i==agriculture[soldProduct.yearOfSold].length-1){
              let temp={
                productName: soldProduct.productName,
                consumption: soldProduct.quantity,
                production:0,
              } 
              agriculture[soldProduct.yearOfSold].push(temp) 
              temp = {};
              break;
            }
          }
        }
         else {
          newAgricultureProduct.push({
            productName: soldProduct.productName,
            consumption: soldProduct.quantity,
            production: 0 ,
          }) 
          agriculture[soldProduct.yearOfSold] = newAgricultureProduct;
          newAgricultureProduct = [];
        
        }
      }
    });

    producedProducts.forEach((producedProduct) => {
      if (producedProduct.category == "agriculture") {
        if (agriculture.hasOwnProperty(producedProduct.yearOfProduction)) {
         
          for(let i = 0 ; i<agriculture[producedProduct.yearOfProduction].length ; i++){
            if(producedProduct.productName == agriculture[producedProduct.yearOfProduction][i].productName){
              agriculture[producedProduct.yearOfProduction][i].production += producedProduct.quantity
              break;
            }
            else if(i==agriculture[producedProduct.yearOfProduction].length-1){
              let temp={
                productName: producedProduct.productName,
                production: producedProduct.quantity,
                consumption:0,
              } 
              agriculture[producedProduct.yearOfProduction].push(temp) 
              temp = {};
              break;
            }
          }
        }
         else {
          newAgricultureProduct.push({
            productName: producedProduct.productName,
            production: producedProduct.quantity,
            consumption:0,
          }) 
          agriculture[producedProduct.yearOfProduction] = newAgricultureProduct;
          newAgricultureProduct = [];
        
        }
      }
    });

    let diary={}
    let newDiaryProduct = [];
    soldProducts.forEach((soldProduct) => {
      if (soldProduct.category == "diary" ) {
        if (diary.hasOwnProperty(soldProduct.yearOfSold)) {
          
          for(let i = 0 ; i<diary[soldProduct.yearOfSold].length ; i++){
            if(soldProduct.productName == diary[soldProduct.yearOfSold][i].productName){
              diary[soldProduct.yearOfSold][i].quantity += soldProduct.consumption
              break;
            }
            else if(i==diary[soldProduct.yearOfSold].length-1){
              let temp={
                productName: soldProduct.productName,
                consumption: soldProduct.quantity,
                production:0,
              } 
              diary[soldProduct.yearOfSold].push(temp) 
              temp = {};
              break;
            }
          }
        }
         else {
          newDiaryProduct.push({
            productName: soldProduct.productName,
            consumption: soldProduct.quantity,
            production:0,
          }) 
          diary[soldProduct.yearOfSold] = newDiaryProduct;
          newDiaryProduct = [];
        
        }
      }
    });
    producedProducts.forEach((producedProduct) => {
      if (producedProduct.category == "diary") {
        if (diary.hasOwnProperty(producedProduct.yearOfProduction)) {
          
          for(let i = 0 ; i<diary[producedProduct.yearOfProduction].length ; i++){
            if(producedProduct.productName == diary[producedProduct.yearOfProduction][i].productName){
              diary[producedProduct.yearOfProduction][i].production += producedProduct.quantity
              break;
            }
            else if(i==diary[producedProduct.yearOfProduction].length-1){
              let temp={
                productName: producedProduct.productName,
                production: producedProduct.quantity,
                consumption : 0
              } 
              diary[producedProduct.yearOfProduction].push(temp) 
              temp = {};
              break;
            }
          }
        }
         else {
          newDiaryProduct.push({
            productName: producedProduct.productName,
            production: producedProduct.quantity,
            consumption:0,
          }) 
          diary[producedProduct.yearOfProduction] = newDiaryProduct;
          newDiaryProduct = [];
        
        }
      }
    });

    let protein={}
    let newProteinProduct = [];

    soldProducts.forEach((soldProduct) => {
      if (soldProduct.category == "protein" ) {
        if (protein.hasOwnProperty(soldProduct.yearOfSold)) {
          
          for(let i = 0 ; i<protein[soldProduct.yearOfSold].length ; i++){
            if(soldProduct.productName == protein[soldProduct.yearOfSold][i].productName){
              protein[soldProduct.yearOfSold][i].consumption += soldProduct.quantity
              break;
            }
            else if(i==protein[soldProduct.yearOfSold].length-1){
              let temp={
                productName: soldProduct.productName,
                consumption: soldProduct.quantity,
                production:0,
              } 
              protein[soldProduct.yearOfSold].push(temp) 
              temp = {};
              break;
            }
          }
        }
         else {
          newProteinProduct.push({
            productName: soldProduct.productName,
            consumption: soldProduct.quantity,
            production:0,
          }) 
          protein[soldProduct.yearOfSold] = newProteinProduct;
          newProteinProduct = [];
        
        }
      }
    });

    producedProducts.forEach((producedProduct) => {
      if (producedProduct.category == "protein") {
        if (protein.hasOwnProperty(producedProduct.yearOfProduction)) {
          
          for(let i = 0 ; i<protein[producedProduct.yearOfProduction].length ; i++){
            if(producedProduct.productName == protein[producedProduct.yearOfProduction][i].productName){
              protein[producedProduct.yearOfProduction][i].production += producedProduct.quantity
              break;
            }
            else if(i==protein[producedProduct.yearOfProduction].length-1){
              let temp={
                productName: producedProduct.productName,
                production: producedProduct.quantity,
                consumption:0,
              } 
              protein[producedProduct.yearOfProduction].push(temp) 
              temp = {};
              break;
            }
          }
        }
         else {
          newProteinProduct.push({
            productName: producedProduct.productName,
            production: producedProduct.quantity,
            consumption:0,
          }) 
          protein[producedProduct.yearOfProduction] = newProteinProduct;
          newProteinProduct = [];
        
        }
      }
    });

 
    res.status(200).send({
      apiStatus: true,
      data: {agriculture , diary , protein},
      message: "whole products fetched",
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

module.exports = Home;
