const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
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
            enum: ['charity', 'producer', 'seller',]
        },
        tokens: [
            {
                token: { type: String, required: true },
            },
        ],
    }
);

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id, user_type: user.userType }, "RCP");
    if (user.tokens.length == 3) throw new Error("maximum logged in devices 3");
    user.tokens = user.tokens.concat({ token }); //make all tokens of charity in array
    await user.save();
    return token;
};

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

const User = mongoose.model("User", userSchema)
module.exports = User