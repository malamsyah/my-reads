import { useState, useCallback, useEffect } from "react";
import * as BooksAPI from "../apis/BooksAPI";
import Book from "./Book";
import { debounce } from "lodash";
import CloseSearch from "./CloseSearch";

const SearchBooks = ({ books, onUpdateShelf }) => {
  const [searchResults, setSearchResults] = useState([]);
  const maxResults = 20;

  useEffect(() => {
    var groupMap = new Map();
    books.map((book) => {
      groupMap.set(book.id, book.shelf);
    });

    let updatedSearchResult = searchResults.map((book) => {
      if (groupMap.get(book.id)) {
        book.shelf = groupMap.get(book.id);
      } else {
        book.shelf = "none";
      }
      return book;
    });
    setSearchResults(updatedSearchResult);
  }, [books]);

  const debounceSearchHandler = useCallback(
    debounce((value, localBooks) => {
      handleSearch(value, localBooks);
    }, 250),
    []
  );

  const handleSearch = (value, localBooks) => {
    if (value.length > 0) {
      BooksAPI.search(value, maxResults).then((res) => {
        if (res.error) {
          setSearchResults([]);
        } else {
          var groupMap = new Map();
          localBooks.map((book) => {
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
    } else {
      setSearchResults([]);
    }
  };

  const handleCloseSearch = () => {
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
            onChange={(e) => {
              debounceSearchHandler(e.target.value, books);
            }}
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
