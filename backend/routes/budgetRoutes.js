const express = require('express');
const router = express.Router();
const AuthHelper = require('../helper/JWTAuthHelper');
const TryCatch = require('../helper/TryCatch');
const Messages = require('../constants/Message');
const budgetController = require('../controllers/budgetController');

//imports here

//code here

//Entity - Budget --start
//CRUD Operations - Budget
router.post('/create', AuthHelper.verifyToken, new TryCatch(budgetController.createBudget).tryCatchGlobe());
router.get('/get-by-id/:id', AuthHelper.verifyToken, new TryCatch(budgetController.getById).tryCatchGlobe());
router.get('/get-all', AuthHelper.verifyToken, new TryCatch(budgetController.getAllBudgets).tryCatchGlobe());
router.delete('/delete-by-id/:id', AuthHelper.verifyToken, new TryCatch(budgetController.deleteById).tryCatchGlobe());
router.post("/update-by-id/:id", AuthHelper.verifyToken, new TryCatch(budgetController.updateById).tryCatchGlobe());
//Entity - Budget - End

module.exports = router;