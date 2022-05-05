import { useState, useEffect } from "react";
import * as BooksAPI from "../apis/BooksAPI";
import Book from "./Book";
import { debounce } from "lodash";
import CloseSearch from "./CloseSearch";

const SearchBooks = ({ books, onUpdateShelf }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsWithCurrentData, setSearchResultsWithCurrentData] =
    useState([]);
  const maxResults = 20;

  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResultsWithCurrentData([]);
    }

    let groupMap = new Map();
    books.forEach((book) => {
      groupMap.set(book.id, book.shelf);
    });

    const updatedSearchResult = searchResults.map((book) => {
      if (groupMap.get(book.id)) {
        book.shelf = groupMap.get(book.id);
      } else {
        book.shelf = "none";
      }
      return book;
    });

    setSearchResultsWithCurrentData(updatedSearchResult);
  }, [books, searchResults]);

  const handleSearch = (value) => {
    console.log(value);
    if (value.length > 0) {
      BooksAPI.search(value, maxResults).then((res) => {
        if (res.error) {
          setSearchResults([]);
        } else {
          setSearchResults(res);
        }
      });
    } else {
      setSearchResults([]);
    }
  };

  const debounceHandleChange = debounce((value) => handleSearch(value), 250);

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
              debounceHandleChange(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResultsWithCurrentData.map((res) => (
            <Book key={res.id} book={res} onUpdateShelf={onUpdateShelf}></Book>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
