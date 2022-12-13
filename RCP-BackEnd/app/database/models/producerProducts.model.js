const mongoose = require("mongoose");

const producerProductsSchema = mongoose.Schema(
  {
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Producer",
    },
    producerName: {
      type: String,
      required: true,
      trim: true,
    },
    location:{
      type:String,
      required:true,
    },
    productName: {
      type: String,
      min: 5,
      max: 10,
      required: true,
      trim: true,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    yearOfProduction: {
      type: Number,
      min:2000,
      max:new Date().getFullYear(),
      required: true, 
    },
   
    category: {
      type: String,
      enum: [
        "agriculture",
        "protein",
        "diary"
      ],
      lowercase: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

producerProductsSchema.methods.toJSON = function () {
  const productsData = this.toObject();
  delete productsData.__v;
  return productsData;
};

const producerProducts = mongoose.model("producerProducts", producerProductsSchema);

module.exports = producerProducts;
