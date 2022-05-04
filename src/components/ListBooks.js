import Bookshelf from "./Bookshelf";

const ListBooks = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf></Bookshelf>
          <Bookshelf></Bookshelf>
          <Bookshelf></Bookshelf>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => console.log("open-search")}>Add a book</a>
      </div>
    </div>
  );
};

export default ListBooks;
