const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  userType: {
    type: String,
    trim: true,
    required: true,
    enum: ["charity", "producer", "seller"],
  },
  location: {
    type: String,
    trim: true,
    enum: ["Berlin", "Dortmund", "Hamburg", "Bayern"],
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: { type: String, trim: true },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});
userSchema.methods.toJSON = function () {
  const producerData = this.toObject();
  delete producerData.__v;
  return producerData;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, user_type: user.userType }, "RCP");
  if (user.tokens.length == 3) throw new Error("maximum logged in devices 3");
  user.tokens = user.tokens.concat({ token }); //make all tokens of charity in array
  await user.save();
  return token;
};

// userSchema.methods.generateFields = async function () {
//   const user = this;
//   if (user.userType === "seller" || user.userType === "producer") {
//     return userSchema.add({ numberOfDonations:{ type: Number, default: 0 } });
//   } else {
//     return userSchema.add({
//       donations: [
//         {
//           donatorId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: "Seller",
//           },
//           donationId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: "sellerDonations",
//           },
//           donatorName: {
//             type: String,
//             required: true,
//             trim: true,
//           },
//           location: {
//             type: String,
//             required: true,
//           },
//           productName: {
//             type: String,
//             min: 5,
//             max: 10,
//             required: true,
//             trim: true,
//             lowercase: true,
//           },
//           quantity: {
//             type: Number,
//             required: true,
//           },
//           category: {
//             type: String,
//             enum: ["agriculture", "protein", "diary"],
//             lowercase: true,
//             required: true,
//             trim: true,
//           },
//           checked: {
//             type: Boolean,
//             required: true,
//           },
//         },
//       ],
//     });
    
    
//   }
// };
userSchema.path('userType').validate(function(value) {
    // When running in `validate()` or `validateSync()`, the
    // validator can access the document using `this`.
    // Does **not** work with update validators.
    if (this.name.toLowerCase().indexOf('red') !== -1) {
      return value !== 'red';
    }
    return true;
  });

userSchema.statics.login = async (email, pass) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invalid email");
  const isValid = await bcryptjs.compare(pass, user.password);
  if (!isValid) throw new Error("invalid password");
  return user;
};

userSchema.pre("save", async function () {
  const data = this;
  if (data.isModified("password")) {
    data.password = await bcryptjs.hash(data.password, 12);
  }
});

userSchema.virtual("mySoldProducts", {
  ref: "soldProducts",
  localField: "_id",
  foreignField: "sellerId",
});

userSchema.virtual("myDonations", {
  ref: "sellerDonations",
  localField: "_id",
  foreignField: "donatorId",
});

userSchema.virtual("myProducts", {
  ref: "producerProducts",
  localField: "_id",
  foreignField: "producerId",
});

userSchema.virtual("myDonations", {
  ref: "producerDonations",
  localField: "_id",
  foreignField: "donatorId",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
