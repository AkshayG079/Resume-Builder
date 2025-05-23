const express = require("express")
const { userList, createUser, updateUser, deleteUser } = require("../controllers/userController")
const router = express.Router()

router.route('/').get(userList)
router.route('/create').post(createUser)
router.route('/Update').put(updateUser)
router.route('/Delete').delete(deleteUser)

module.exports = router
