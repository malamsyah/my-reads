import Book from "./Book";

const Bookshelf = () => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <Book></Book>
          <Book></Book>
          <Book></Book>
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
