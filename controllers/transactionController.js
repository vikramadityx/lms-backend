const Transaction = require('../models/transaction');
const Book = require('../models/Book');

// Create a new transaction (lend a book)
const createTransaction = async (req, res) => {
    try {
        const { bookId, userId, dueDate } = req.body;
        const book = await Book.findById(bookId);
        if (!book || book.lendedBooks >= book.bookQuantityPresent) {
            return res.status(400).json({ error: 'Book not available for lending' });
        }
        const newTransaction = new Transaction({ bookId, userId, dueDate });
        await newTransaction.save();
        book.lendedBooks += 1;
        await book.save();
        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Return a book (update transaction status)
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndUpdate(id, { returned: true }, { new: true });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        const book = await Book.findById(transaction.bookId);
        if (book && book.lendedBooks > 0) {
            book.lendedBooks -= 1;
            await book.save();
        }
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete transaction by ID
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTransaction,
    returnBook,
    getTransactionById,
    deleteTransaction
};
