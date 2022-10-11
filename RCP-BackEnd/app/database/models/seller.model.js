const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerSchema = mongoose.Schema(
  {
    name: { type: String, trim:true, required: true },
    age: {
      type: Number,
      default: 21,
      min: 18,
      required: true,
    },
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
    gender: {
      type: String,
      trim: true,
      enum: ["male", "female", "prefer not to say"],
      lowercase: true,
    },
    savedPosts: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        title: {
          type: String,
          trim: true,
          required: true,
        },
        author: {
          type: String,
          trim: true,
          required: true,
        },
        snippet: {
          type: String,
          trim: true,
          required: true,
        },
        content: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    likedPosts: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

sellerSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.__v;
  return userData;
};

sellerSchema.pre("save", async function () {
  const data = this;
  if (data.isModified("password")) {
    data.password = await bcryptjs.hash(data.password, 12);
  }
});



sellerSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "zBlogPosts");
  if (user.tokens.length == 3) throw new Error("maximum logged in devices 3");
  user.tokens = user.tokens.concat({ token }); //make all tokens of user in array
  await user.save();
  return token;
};

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
