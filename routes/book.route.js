const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, updateBook, deleteBook, loanBook, returnBook } = require('../controllers/book.controller');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/:id/loan', loanBook);
router.put('/:id/return', returnBook);

module.exports = router;