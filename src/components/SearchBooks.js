import { useState } from "react";
import * as BooksAPI from "../apis/BooksAPI";
import Book from "./Book";

const SearchBooks = ({ books, onUpdateShelf }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  var groupMap = new Map();
  books.map((book) => {
    groupMap.set(book.id, book.shelf);
  });

  const maxResults = 20;
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value.length > 0) {
      BooksAPI.search(value, maxResults).then((res) => {
        if (res.error) {
          setSearchResults([]);
        } else {
          res.forEach((book) => {
            if (groupMap.get(book.id)) {
              book.shelf = groupMap.get(book.id);
            } else {
              book.shelf = "none";
            }
          });
          setSearchResults(res);
        }
      });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search">Close</a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((res) => (
            <Book key={res.id} book={res} onUpdateShelf={onUpdateShelf}></Book>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
