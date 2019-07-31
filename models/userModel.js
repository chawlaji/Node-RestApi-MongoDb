const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    profilePic: {
        type: String,
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    verified: {
        type: Boolean
    },
    timeStamp:{
        type: Date
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type:String,
       required: true,
    },


});

module.exports = mongoose.model('User',userSchema);
