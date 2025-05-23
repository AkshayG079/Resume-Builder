const mongoose = require('mongoose')

const resumeDataItemSchema = new mongoose.Schema({
    resumeData: {
        type: Object,
        required: true,
        default: {},
    },
});

// Define the main resume schema
const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: [resumeDataItemSchema],
        required: true,
    },
});



const Resume = new mongoose.model('Resume', resumeSchema);

module.exports = Resume;