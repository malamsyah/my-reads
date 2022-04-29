import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import * as BooksAPI from "./apis/BooksAPI";
import ListBooks from "./components/ListBooks";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();

      console.log(res);
      setBooks(res);
    };

    getBooks();
  }, []);

  let routes = useRoutes([{ path: "/", element: <ListBooks /> }]);

  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
