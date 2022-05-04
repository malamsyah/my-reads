import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./apis/BooksAPI";
import ListBooks from "./components/ListBooks";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();

      console.log(res);
      setBooks(res);
    };

    getBooks();
  }, []);

  const groups = [
    { shelf: "currentlyReading", name: "Currently Reading" },
    { shelf: "wantToRead", name: "Want to Read" },
    { shelf: "read", name: "Read" },
  ];

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={<ListBooks books={books} groups={groups} />}
        />
      </Routes>
    </div>
  );
};

export default App;
