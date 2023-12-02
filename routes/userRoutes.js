const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { registerUser, loginUser, registerUsersInBulk , updatePassword} = require('../controllers/userController')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/register/bulk', registerUsersInBulk); 
router.put('/:userId/update-password', updatePassword);

module.exports = router;
