const asyncHandler = require('express-async-handler');
const Resume = require("../models/resume");
const User = require("../models/user");

const resumeList = asyncHandler(async (req, res) => {
    const list = await Resume.find();
    res.status(200).send(list)
})

const createResume = asyncHandler(async (req, res) => {
    const { resume, userId } = req.body;
    if (!resume && !userId) {
        return res.status(400).send({ message: "Missing data passed into request." });
    }
    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
        return res.status(400).send({ message: "User does not exist." });
    }

    const isResumeExist = await Resume.findOne({ userId: userId });
    if (!isResumeExist) {
        const newResume = await Resume.create({
            userId,
            resume
        });
        return res.status(200).send(newResume);
    }

    const updatedResume = await Resume.findByIdAndUpdate(
        isResumeExist._id,
        {
            $push: { resume: resume }
        },
        { new: true }
    );

    res.status(200).send(updatedResume);
});



const updateResume = asyncHandler(async (req, res) => {
    const { resumeData, userId, resumeId, resumeDataId } = req.body;

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
        return res.status(400).send({ message: "User does not exist." });
    }

    const resumeDocument = await Resume.findById(resumeId);
    if (!resumeDocument) {
        return res.status(400).send({ message: "Resume does not exist." });
    }

    const resumeDataIndex = resumeDocument.resume.findIndex(resume => resume._id.toString() === resumeDataId);
    if (resumeDataIndex === -1) {
        return res.status(400).send({ message: "ResumeData not found." });
    }

    resumeDocument.resume[resumeDataIndex].resumeData = resumeData;
    await resumeDocument.save();

    res.status(200).send(resumeDocument);
});

const deleteResume = asyncHandler(async (req, res) => {
    const { resumeId, resumeDataId } = req.body;

    const resumeDocument = await Resume.findOne({ _id: resumeId });
    if (!resumeDocument) {
        return res.status(400).send({ message: "Resume does not exist." });
    }

    const isResumePresent = resumeDocument.resume.some(resume => resume._id.toString() === resumeDataId);

    if (!isResumePresent) {
        return res.status(400).send({ message: "Resume data not found." });
    }

    const updatedResume = resumeDocument.resume.filter(resume => resume._id.toString() !== resumeDataId);
    resumeDocument.resume = updatedResume;
    await resumeDocument.save();

    res.status(200).send(resumeDocument);
});

const particularResume = asyncHandler(async (req, res) => {
    const { Id } = req.params;
    const resumeData = await Resume.findOne({ userId: Id });
    res.status(200).send(resumeData)
})




module.exports = { resumeList, createResume, updateResume, deleteResume, particularResume }
