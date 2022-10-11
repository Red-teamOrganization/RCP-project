const mongoose = require("mongoose");

const soldProductsSchema = mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    sellerName: {
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
    yearOfSold: {
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

soldProductsSchema.methods.toJSON = function () {
  const postsData = this.toObject();
  delete postsData.__v;
  return postsData;
};

const posts = mongoose.model("soldProducts", soldProductsSchema);

module.exports = posts;
