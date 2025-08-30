const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  const { title, author, isbn, genre, totalStock } = req.body;
  try {
    let book = await Book.findOne({ isbn });
    if (book) {
      return res.status(400).json({ msg: 'Book with this ISBN already exists' });
    }
    const newBook = new Book({
      title, author, isbn, genre, totalStock,
      availableStock: totalStock,
    });
    book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;