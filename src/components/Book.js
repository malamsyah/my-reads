import BookshelfChanger from "./BookshelfChanger";
import PropTypes from "prop-types";

const Book = ({ book, onUpdateShelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks && book.imageLinks.thumbnail
              })`,
            }}
          ></div>
          <BookshelfChanger
            book={book}
            onUpdateShelf={onUpdateShelf}
          ></BookshelfChanger>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default Book;
