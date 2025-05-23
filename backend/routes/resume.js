const express = require("express")
const { resumeList, createResume, updateResume, deleteResume,particularResume } = require("../controllers/resumeController")
const router = express.Router()

router.route('/:Id').get(particularResume)
router.route('/').get(resumeList)
router.route('/create').post(createResume)
router.route('/Update').put(updateResume)
router.route('/Delete').put(deleteResume)

module.exports = router
