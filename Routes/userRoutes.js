const express = require('express')
const router = express.Router();




const userController = require('../Controllers/userController.js')




// ============= all request route here ===============================================
router.post('/register', userController.userRegistration);
router.post('/login', userController.userLogin);


module.exports = router;