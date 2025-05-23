const asyncHandler = require('express-async-handler');
const User = require("../models/user");

const userList = asyncHandler(async (req, res) => {
    const list = await User.find();
    res.status(200).send(list)
})

const createUser = asyncHandler(async (req, res) => {
    const { userName, password, email } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).send({ message: "Missing data passed into request" })
    }

    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        return res.status(400).send({ message: "Email is already exist." })
    }

    const newUser = await User.create({
        userName,
        password,
        email
    })
    res.status(200).send(newUser)
})

const updateUser = asyncHandler(async (req, res) => {
    const { userId, userName } = req.body;
    const isUserExist = await User.findOne({ _id: userId })
    if (!isUserExist) {
        return res.status(400).send({ message: "User does not exist." })
    }
    const updateDetails = await User.findByIdAndUpdate({ _id: userId }, {
        $set: {
            userName: userName
        }
    }, { new: true });
    res.status(200).send(updateDetails)
})

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const isUserExist = await User.findOne({ _id: userId })
    if (!isUserExist) {
        return res.status(400).send({ message: "User does not exist." })
    }
    const userDetails = await User.findByIdAndDelete({ _id: userId });
    res.status(200).send(userDetails)
})

module.exports = { userList, createUser, updateUser, deleteUser }

