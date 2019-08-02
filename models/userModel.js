const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
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
        validate(value) {
            if (value > Date.now()) {
                throw new Error('invalid input for date of birth')
            }
        }
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
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your username!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your password!')
            }
        }
    },


});

module.exports = mongoose.model('User', userSchema);
