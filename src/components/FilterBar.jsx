import { FaFilter, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "./FilterBar.css";

function FilterBar({ selectedGenre, setSelectedGenre, selectedMood, setSelectedMood, sortBy, setSortBy }) {
  const [showFilters, setShowFilters] = useState(false);

  const genres = ["All", "Electronic", "Pop", "Indie", "Hip Hop", "Ambient", "Folk", "Classical", "World", "Synthwave", "Rock", "Reggae", "Jazz", "Orchestral"];
  const moods = ["All", "Chill", "Energetic", "Happy", "Relaxing", "Peaceful", "Romantic", "Mysterious", "Intense", "Melancholic", "Futuristic", "Epic"];
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "title", label: "Title (A-Z)" },
    { value: "artist", label: "Artist (A-Z)" },
    { value: "genre", label: "Genre" },
    { value: "mood", label: "Mood" }
  ];

  const hasActiveFilters = selectedGenre !== "All" || selectedMood !== "All" || sortBy !== "default";

  const clearAllFilters = () => {
    setSelectedGenre("All");
    setSelectedMood("All");
    setSortBy("default");
  };

  return (
    <div className="filter-bar">
      <button 
        className={`filter-toggle ${showFilters ? "active" : ""} ${hasActiveFilters ? "has-filters" : ""}`}
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter />
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">•</span>}
      </button>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-section">
            <label>Genre</label>
            <div className="filter-chips">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`filter-chip ${selectedGenre === genre ? "active" : ""}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Mood</label>
            <div className="filter-chips">
              {moods.map(mood => (
                <button
                  key={mood}
                  className={`filter-chip ${selectedMood === mood ? "active" : ""}`}
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearAllFilters}>
              <FaTimes />
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterBar;
