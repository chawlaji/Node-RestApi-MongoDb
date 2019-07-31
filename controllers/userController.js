const express = require('express');
const router = express.Router();
const model = require('../models/userModel');


module.exports = {

    addUser: async (req, res, next) => {
        try {
            req.body.timeStamp = Date.now();
            req.body.verified = false;
            const NewUser = new model(req.body);
            await NewUser.save((err) => {
                if (err) {
                    res.status(500).json({ message: err });
                    res.send(err);
                } else {
                    res.status(200).json({ message: 'saved', data: NewUser });


                }
            });


            // res.status(200).send(res)
        } catch (error) {
            // res.status(500).send(error)
        }

    },
    verifyUser: async (req, res, next) => {
           
     await   model.findByIdAndUpdate({_id: req.params.id},{$set:req.body} , function(err,NewUser) {
            if (err)
              res.send(err);
            res.json(NewUser);
          });
        
    }

}