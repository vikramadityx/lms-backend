const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');

router.post('/register', instituteController.registerInstitute);
router.post('/login', instituteController.loginInstitute);
router.get('/:id', instituteController.getInstituteById);
router.put('/:id', instituteController.updateInstitute);
router.delete('/:id', instituteController.deleteInstitute);

module.exports = router;
