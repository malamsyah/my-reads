import { useState } from "react";
import PropTypes from "prop-types";

const BookshelfChanger = ({ group, book, onUpdateShelf }) => {
  const [shelf, setShelf] = useState(group.shelf);

  const handleOnChange = (event) => {
    setShelf({ value: event.target.value });
    onUpdateShelf(book, event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select value={shelf} onChange={handleOnChange}>
        <option value="none" disabled>
          Move to...
        </option>
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
  group: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default BookshelfChanger;
