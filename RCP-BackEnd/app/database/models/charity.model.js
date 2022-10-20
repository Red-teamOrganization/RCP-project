const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./user.model");


const charitySchema = mongoose.Schema(
  {
    user: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    // name: { type: String, trim: true, required: true, unique: true },
    // email: {
    //   type: String,
    //   trim: true,
    //   unique: true,
    //   required: true,
    // },
    image: { type: String, trim: true },
    // password: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      enum: ['Berlin', 'Dortmund', 'Hamburg', 'Bayern'],
      required: true,
    },
    // userType : {
    //  type:String,
    //  trim: true , 
    //  required:true,
    //  enum:'charity'
    // },
    donations: [
      {
        donatorId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Seller",
        },
        donationId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "sellerDonations",
        },
        donatorName: {
          type: String,
          required: true,
          trim: true,
        },
        location: {
          type: String,
          required: true,
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
        checked: {
          type: Boolean,
          required: true,
        }
      }
    ],
    // tokens: [
    //   {
    //     token: { type: String, required: true },
    //   },
    // ],
  },
  { timestamps: true }
);

charitySchema.methods.toJSON = function () {
  const charityData = this.toObject();
  delete charityData.__v;
  return charityData;
};

charitySchema.pre("save", async function () {
  const data = this;
  if (data.isModified("password")) {
    data.password = await bcryptjs.hash(data.password, 12);
  }
});



// charitySchema.methods.generateToken = async function () {
//   const charity = this;
//   const token = jwt.sign({ _id: charity._id }, "RCP");
//   if (charity.tokens.length == 3) throw new Error("maximum logged in devices 3");
//   charity.tokens = charity.tokens.concat({ token }); //make all tokens of charity in array
//   await charity.save();
//   return token;
// };

// charitySchema.statics.login = async (email, pass) => {
//   const charityData = await Charity.findOne({ email });
//   if (!charityData) throw new Error("invalid email");
//   const isValid = await bcryptjs.compare(pass, charityData.password);
//   if (!isValid) throw new Error("invalid password");
//   return charityData;
// };

// charitySchema.virtual("myDonators", {
//   ref: "sellerDonations",
//   localField: "_id",
//   foreignField: "charityId",
// });

const Charity = mongoose.model("Charity", charitySchema);

module.exports = Charity;