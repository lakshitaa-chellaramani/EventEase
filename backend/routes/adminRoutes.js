const express = require('express');
const router = express.Router();
const AuthHelper = require('../helper/JWTAuthHelper');
const TryCatch = require('../helper/TryCatch');
const Messages = require('../constants/Message');
const adminController = require('../controllers/adminController');

//imports here

//code here

//Entity - Admin --start
//Authentication - Admin
router.post('/register', new TryCatch(adminController.apiRegister).tryCatchGlobe());
router.post('/login', new TryCatch(adminController.apiLogin).tryCatchGlobe());

//CRUD Operations - Admin
router.post('/does-email-exists', AuthHelper.verifyToken, new TryCatch(adminController.doesEmailExist).tryCatchGlobe());
router.get('/get-by-id/:id', AuthHelper.verifyToken, new TryCatch(adminController.getById).tryCatchGlobe());
router.get('/get-by-email/:email', AuthHelper.verifyToken, new TryCatch(adminController.getByEmail).tryCatchGlobe());
router.get('/get-all', AuthHelper.verifyToken, new TryCatch(adminController.getAllAdmins).tryCatchGlobe());
router.delete('/delete-by-id/:id', AuthHelper.verifyToken, new TryCatch(adminController.deleteById).tryCatchGlobe());
router.post("/update-by-id/:id", AuthHelper.verifyToken, new TryCatch(adminController.updateById).tryCatchGlobe());
router.post("/update-by-email/:email", new TryCatch(adminController.updateByEmail).tryCatchGlobe());
//Entity - Admin - End

module.exports = router;