const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    instituteName: {
        type: String,
        ref: 'Institute',
        required: false
    },
    bookNumber: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    shelfNumber: {
        type: String,
        required: true
    },
    sku: {
        type: Number,
        required: true
    },
    lendedBooks: {
        type: Number,
        default: 0,
        required: false
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
