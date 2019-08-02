const express = require('express');
const router = express.Router();
const model = require('../models/userModel');
// never use 400* as unable to handle in android

module.exports = {

    addUser: async (req, res, next) => {
        try {
            const NewUser = new model(req.body);
            await NewUser.save()
                .then(res => {
                    if (res) {
                        res.status(200).json({ message: 'saved', data: NewUser });
                    }
                })
                .catch(err => {
                    res.status(208).send({ message: 'unable to save user', error: err.errmsg });
                });
        } catch (error) {
            res.status(500).send(error);
        }

    },
    verifyUser: async (req, res, next) => {
        try {
            const NewUser = await model.updateOne({ username: req.params.username }, { $set: req.body })
                .catch(err => {
                    res.send({ message: 'unable to verify user', error: err });
                });
            if (NewUser.n == 0) {
                res.status(400).send({ message: 'user not found' });
            } else if (NewUser.n == 1) {
                const updatedUser = await model.findOne({ username: req.params.username });
                if (updatedUser) {
                    res.status(200).send({ message: 'user updated', data: updatedUser });
                } else {
                    res.status(400).send({ message: 'user was updated but not found for display' });
                }
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const user = await model.findOne({ username: req.params.username });
            if (user) {
                res.status(200).send({ message: 'user found', data: user });
            }else {
            res.status(208).send({ message: 'user not found' });
            }
        }
        catch (error) {
              res.send(error);

        }

    },
    deleteUser: async (req, res, next) => {
        try {
            const username = req.params.username;
            if (username !== null && username !== 'all') {
                const user = await model.deleteOne({ username: req.params.username });
                if (user.n == 1) {
                    res.status(200).send({ message: 'user deleted' });
                } else if(user.n == 0){
                    res.status(400).send({ message: 'user not found' });
                }
                
            } else {
                const user = await model.deleteMany({ "verified": false });
                console.log(user);
                if (user.n >= 1) {
                    res.status(200).send({ message: 'no. of user deleted are', data: user.n });
                }
            }
        } catch (error) {
            res.status(208).send({ message: 'unable to delete users' });
        }

    }

}
