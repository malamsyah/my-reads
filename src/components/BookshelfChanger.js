import { useState } from "react";

const BookshelfChanger = ({ group }) => {
  const [shelf, setShelf] = useState(group.shelf);

  const handleOnChange = (event) => {
    setShelf({ value: event.target.value });
    console.log(event);
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

export default BookshelfChanger;
