const express = require('express');
const router = express.Router();

module.exports= {

addUser: async (req, res, next) => {
 try {
    res.status(200).send({message:"hello post"})
 } catch (error) {
     res.status(500).send(error)
 }
    
}


}