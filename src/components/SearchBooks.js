import { useState, useCallback, useEffect } from "react";
import * as BooksAPI from "../apis/BooksAPI";
import Book from "./Book";
import { debounce } from "lodash";
import CloseSearch from "./CloseSearch";

const SearchBooks = ({ books, onUpdateShelf }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const maxResults = 20;

  useEffect(() => {
    if (searchResults.length == 0) {
      return;
    }
    var groupMap = new Map();
    books.map((book) => {
      groupMap.set(book.id, book.shelf);
    });

    const newValue = searchResults.map((book) => {
      if (groupMap.get(book.id)) {
        book.shelf = groupMap.get(book.id);
      } else {
        book.shelf = "none";
      }

      return book;
    });

    setSearchResults(newValue);
  }, [books]);

  const debounceHandler = useCallback(
    debounce((query) => {
      BooksAPI.search(query, maxResults).then((res) => {
        if (res.error) {
          setSearchResults([]);
        } else {
          var groupMap = new Map();
          books.map((book) => {
            groupMap.set(book.id, book.shelf);
          });

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
    }, 1000),
    []
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value.length > 0) {
      debounceHandler(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleCloseSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <CloseSearch handleCloseSearch={handleCloseSearch} />
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
