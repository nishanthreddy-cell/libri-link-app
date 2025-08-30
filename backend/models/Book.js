const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  totalStock: { type: Number, required: true, min: 0 },
  availableStock: { type: Number, required: true, min: 0 },
  coverImageURL: { type: String, default: 'https://via.placeholder.com/150x220.png?text=No+Cover' }
});
module.exports = mongoose.model('Book', bookSchema);