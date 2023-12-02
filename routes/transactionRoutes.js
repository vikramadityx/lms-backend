const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Transaction Routes
router.post('/create', transactionController.createTransaction);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id/return', transactionController.returnBook);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
