import Book from "./Book";
import PropTypes from "prop-types";

const Bookshelf = ({ books, group, onUpdateShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{group.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onUpdateShelf={onUpdateShelf}
            ></Book>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  group: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default Bookshelf;
