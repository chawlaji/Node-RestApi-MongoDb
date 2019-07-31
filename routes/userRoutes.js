const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController')



router.post('/user',userController.addUser);
router.patch('/user/:id',userController.verifyUser);
/* router.get('/user',userController.getUser);

router.delete('/user/:id',userController.deleteUser); */

module.exports = router;