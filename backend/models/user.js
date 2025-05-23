const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true
    },
},  { timestamps: true }
)

const User = new mongoose.model("User", userSchema);

module.exports = User;