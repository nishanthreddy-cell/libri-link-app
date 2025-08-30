import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div className="book-list">
      <h2>Library Catalog</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {books.length === 0 ? <p>No books in the library yet. Add one to get started!</p> :
          books.map((book) => (
          <div key={book._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '220px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <img src={book.coverImageURL} alt={book.title} style={{ width: '150px', height: '220px', objectFit: 'cover' }} />
            <h3 style={{fontSize: '1.1em', margin: '10px 0 5px 0'}}>{book.title}</h3>
            <p style={{margin: '0 0 10px 0', color: '#555'}}>by {book.author}</p>
            <p style={{fontSize: '0.9em', color: '#777'}}><strong>Available:</strong> {book.availableStock} / {book.totalStock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;