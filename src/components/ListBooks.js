import Bookshelf from "./Bookshelf";
import PropTypes from "prop-types";

const ListBooks = ({ books, groups, onUpdateShelf }) => {
  const filterBooksByShelf = (group) => {
    return books.filter((book) => book.shelf === group.shelf);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {groups.map((group) => (
            <Bookshelf
              key={group.shelf}
              books={filterBooksByShelf(group)}
              group={group}
              onUpdateShelf={onUpdateShelf}
            ></Bookshelf>
          ))}
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
  groups: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default ListBooks;
