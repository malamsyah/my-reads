import { Link } from "react-router-dom";

const CloseSearch = ({ handleCloseSearch }) => {
  return (
    <Link to="/">
      <button className="close-search" onClick={handleCloseSearch}>
        Close
      </button>
    </Link>
  );
};

export default CloseSearch;
