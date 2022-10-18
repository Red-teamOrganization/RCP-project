const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const validator = require('validator');

// const check = validator.isLatLong("29.9627976,30.9072928")
// console.log(check)

const sellerSchema = mongoose.Schema(
  {
    name: { type: String, trim:true, required: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    image: { type: String, trim: true },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    description:{
      type: String, 
      trim:true, 
    },
    location:{
       type:String,
       trim: true,
       enum:['Berlin','Dortmund','Hamburg','Bayern'],
       required:true,
    },
    userType : {
     type:String,
     trim: true , 
     required:true,
     enum:'seller'
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

sellerSchema.methods.toJSON = function () {
  const sellerData = this.toObject();
  delete sellerData.__v;
  return sellerData;
};

sellerSchema.pre("save", async function () {
  const data = this;
  if (data.isModified("password")) {
    data.password = await bcryptjs.hash(data.password, 12);
  }
});



sellerSchema.methods.generateToken = async function () {
  const seller = this;
  const token = jwt.sign({ _id: seller._id }, "RCP");
  if (seller.tokens.length == 3) throw new Error("maximum logged in devices 3");
  seller.tokens = seller.tokens.concat({ token }); //make all tokens of seller in array
  await seller.save();
  return token;
};

sellerSchema.statics.login = async (email, pass) => {
  const sellerData = await Seller.findOne({ email });
  if (!sellerData) throw new Error("invalid email");
  const isValid = await bcryptjs.compare(pass, sellerData.password);
  if (!isValid) throw new Error("invalid password");
  return sellerData;
};

sellerSchema.virtual("mySoldProducts", {
  ref: "soldProducts",
  localField: "_id",
  foreignField: "sellerId",
});

sellerSchema.virtual("myDonations", {
  ref: "sellerDonations",
  localField: "_id",
  foreignField: "donatorId",
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;