import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button 
          className="clear-search"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
