import Bookshelf from "./Bookshelf";
import PropTypes from "prop-types";

const ListBooks = ({ books }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf books={books}></Bookshelf>
          <Bookshelf books={books}></Bookshelf>
          <Bookshelf books={books}></Bookshelf>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => console.log("open-search")}>Add a book</a>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
};

export default ListBooks;
