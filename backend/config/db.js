const mongoose = require('mongoose');

exports.connectToDatabase = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/ResumeBuilder").then(() => {
        console.log('Connected To DataBase');
    }).catch((error) => {
        console.log(error);
    })
}