import Book from "./Book";
import PropTypes from "prop-types";

const Bookshelf = ({ books, group }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{group.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} group={group}></Book>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  group: PropTypes.object.isRequired,
};

export default Bookshelf;
