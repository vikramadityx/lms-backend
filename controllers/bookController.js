const Book = require('../models/book');

// Add a new book
const addBook = async (req, res) => {
    try {
        const { title, author, instituteName, bookNumber, images, shelfNumber, sku } = req.body;
        const newBook = new Book({ title, author, instituteName, bookNumber, images, shelfNumber, sku });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Get book by ID
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update book by ID
const updateBook = async (req, res) => {
    console.log("Working")
    try {
        const { id } = req.params;
        const { title, author, instituteName, bookNumber, images, shelfNumber } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, instituteName, bookNumber, images, shelfNumber },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        // console.log(error, "error");
        res.status(500).json({ error: error });
    }
};

const updateLendedBooks = async (req, res) => {
    try {
        const { id } = req.params;
        const { lendedBooks } = req.body;

        // Validate the lendedBooks value to ensure it's a non-negative integer
        if (typeof lendedBooks !== 'number' || lendedBooks < 0 || !Number.isInteger(lendedBooks)) {
            return res.status(400).json({ error: 'Invalid lendedBooks value' });
        }

        // Find the book by ID and update the lendedBooks attribute
        const updatedBook = await Book.findByIdAndUpdate(id, { lendedBooks }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Lended books updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
                { author: { $regex: query, $options: 'i' } } // Case-insensitive search for author
            ]
        });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addBook,
    getBookById,
    updateBook,
    deleteBook,
    updateLendedBooks,
    searchBooks,
    getAllBooks
};
