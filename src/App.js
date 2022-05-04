import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./apis/BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();

      // console.log(res);
      setBooks(res);
    };

    getBooks();
  }, []);

  const handleUpdateShelf = (bookToUpdate, shelf) => {
    BooksAPI.update(bookToUpdate, shelf).then((res) => {
      const newBooks = books.map((book) => {
        if (book.id === bookToUpdate.id) {
          book.shelf = shelf;
        }
        return book;
      });

      setBooks(newBooks);
    });
  };

  const groups = [
    { shelf: "currentlyReading", name: "Currently Reading" },
    { shelf: "wantToRead", name: "Want to Read" },
    { shelf: "read", name: "Read" },
  ];

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={
            <SearchBooks books={books} onUpdateShelf={handleUpdateShelf} />
          }
        />
        <Route
          exact
          path="/"
          element={
            <ListBooks
              books={books}
              groups={groups}
              onUpdateShelf={handleUpdateShelf}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
