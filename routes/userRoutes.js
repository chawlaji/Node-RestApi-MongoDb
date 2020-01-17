const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController')
const urlUsername= '/:username';


router.post('/',userController.addUser);
router.patch(urlUsername,userController.updateUser);
router.get(urlUsername,userController.getUser);
router.delete(urlUsername,userController.deleteUser); 

module.exports = router;