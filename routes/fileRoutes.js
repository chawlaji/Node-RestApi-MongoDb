const express = require('express');
const router = express.Router();
const fileController= require('../controllers/fileController')
const urlfile= '/:file';


router.post('/',fileController.bulkUpload);
// router.patch(urlfile,userController.updateUser);
// router.get(urlfile,userController.getUser);
// router.delete(urlfile,userController.deleteUser); 

module.exports = router;