const express = require('express');
const router = express.Router();
const model = require('../models/userModel');
const decrypt = require('../utility/encryption').decrypt;
// never use 400* as unable to handle in android

module.exports = {

    login: async  (req, res, next) => {
        try {
            const user = await model.findOne({ username: req.body.username });
            const result = decrypt(req.body.password, user.password);
            if (result) {
                res.status(200).json({ message: 'LOGIN SUCCESS', data: user });
            }
            else {
                res.status(208).send({ message: 'access denied, please enter a valid password'});
            }
        } catch (error) {
            res.status(500).send({ message: 'User not found', error: error });
        }

    }
}
