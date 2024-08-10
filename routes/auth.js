const express=require('express');
const authController = require("../controllers/auth");
// const {profileImageFileUpload }=require('../middlewares/file-uploads')
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/update-profile/:id',profileImageFileUpload.single('image'), authController.updateProfile);
// router.post('/update-profile/:id', authController.updateProfile);
// router.get('/get-user-profile/:id', authController.getUserProfile)
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/checkOtp', authController.checkOtp);
// router.post('/reset-password', authController.resetPassword);
// router.get('/forgotPasswordRecord', authController.forgotPasswordRecord);
// router.post('/change-password/:id',authController.changePassword);
router.get('/getAllUsers',authController.getAllUsersRecord)
// router.post('/addUserAddress',authController.addUserAddress)
// router.delete('/deleteAddressById/:id',authController.deleteAddressById)
// router.get('/getAllAddress',authController.getAllAddress)
// router.get('/getAddressById/:id',authController.getAddressById)
// router.patch('/updateAddressById/:id', authController.updateAddressById)
module.exports = router; 