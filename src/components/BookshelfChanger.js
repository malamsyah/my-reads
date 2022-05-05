import PropTypes from "prop-types";

const BookshelfChanger = ({ book, onUpdateShelf }) => {
  const handleOnChange = (event) => {
    onUpdateShelf(book, event.target.value);
  };

  const value = book.shelf ? book.shelf : "none";

  return (
    <div className="book-shelf-changer">
      <select value={value} onChange={handleOnChange}>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

BookshelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default BookshelfChanger;
