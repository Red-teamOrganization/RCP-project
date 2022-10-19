const mongoose = require("mongoose");

const sellerDonationSchema = mongoose.Schema(
  { 
    charityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Charity",
  },
  charityName: {
    type: String,
    required: true,
    trim: true,
  },
    donatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    donatorName: {
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

sellerDonationSchema.methods.toJSON = function () {
  const donationsData = this.toObject();
  delete donationsData.__v;
  return donationsData;
};

const sellerDonations = mongoose.model("sellerDonations", sellerDonationSchema);

module.exports = sellerDonations;