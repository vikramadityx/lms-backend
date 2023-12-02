// Book Routes
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {verifyInstitute} = require('../middlewares/auth');

router.post('/add', bookController.addBook);
router.put('/lend/:id', bookController.updateLendedBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.get('/search', bookController.searchBooks); 
router.get('/', bookController.getAllBooks)

module.exports = router;
