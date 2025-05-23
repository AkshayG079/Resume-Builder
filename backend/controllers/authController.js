const asyncHandler = require('express-async-handler');
const User = require("../models/user");

const signupUser = asyncHandler(async (req, res) => {

    const { userName, password, email } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).send({ success: false, message: "Invalid  credentials" })
    }

    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        return res.status(400).send({ success: false, message: "Email is already exist." })
    }

    const newUser = await User.create({
        userName,
        password,
        email
    })
    res.status(200).send({ success: true, message: "Account created SuccessFully.", newUser })

})

const loginUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body;

    if (!email || !password) {
        return res.status(400).send({ success: false, message: "Invalid credentials" })
    }

    const isUser = await User.findOne({ email })
    if (!isUser) {
        return res.status(400).send({ success: false, message: "Email is not register" })
    }

    if (isUser.password !== password) {
        return res.status(400).send({ success: false, message: "Invalid Password" })
    }

    res.status(200).send({ success: true, message: "Login SuccessFully.", isUser })

})

module.exports = { loginUser, signupUser }

