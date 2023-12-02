const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

// User Role Routes
router.post('/create', userRoleController.createUserRole);
router.get('/', userRoleController.getAllUserRoles);
router.get('/:id', userRoleController.getUserRoleById);
router.put('/:id', userRoleController.updateUserRole);
router.delete('/:id', userRoleController.deleteUserRole);

module.exports = router;
