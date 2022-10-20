const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
// const validator = require('validator');

// const check = validator.isLatLong("29.9627976,30.9072928")
// console.log(check)

const producerSchema = mongoose.Schema(
  {
    user: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    // name: { type: String, trim:true, required: true },
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
    //  enum:'producer'
    // },
    numberOfDonations: {
      type: Number,
      default: 0,
    },
    // tokens: [
    //   {
    //     token: { type: String, required: true },
    //   },
    // ],
  },
  { timestamps: true }
);

producerSchema.methods.toJSON = function () {
  const producerData = this.toObject();
  delete producerData.__v;
  return producerData;
};

// producerSchema.pre("save", async function () {
//   const data = this;
//   if (data.isModified("password")) {
//     data.password = await bcryptjs.hash(data.password, 12);
//   }
// });



// producerSchema.methods.generateToken = async function () {
//   const producer = this;
//   const token = jwt.sign({ _id: producer._id }, "RCP");
//   if (producer.tokens.length == 3) throw new Error("maximum logged in devices 3");
//   producer.tokens = producer.tokens.concat({ token }); //make all tokens of producer in array
//   await producer.save();
//   return token;
// };

// producerSchema.statics.login = async (email, pass) => {
//   const producerData = await Producer.findOne({ email });
//   if (!producerData) throw new Error("invalid email");
//   const isValid = await bcryptjs.compare(pass, producerData.password);
//   if (!isValid) throw new Error("invalid password");
//   return producerData;
// };

producerSchema.virtual("myProducts", {
  ref: "producerProducts",
  localField: "_id",
  foreignField: "producerId",
});

producerSchema.virtual("myDonations", {
  ref: "producerDonations",
  localField: "_id",
  foreignField: "donatorId",
});

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;