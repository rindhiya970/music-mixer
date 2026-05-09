import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ResultsCounter from "./components/ResultsCounter";
import SongList from "./components/SongList";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import { songs } from "./data";
import "./App.css";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off, one, all
  const [playlist, setPlaylist] = useState([]);
  const [playQueue, setPlayQueue] = useState([...Array(songs.length).keys()]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort songs
  const getFilteredAndSortedSongs = () => {
    let filtered = songs.filter(song => {
      const matchesSearch = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre;
      const matchesMood = selectedMood === "All" || song.mood === selectedMood;
      
      return matchesSearch && matchesGenre && matchesMood;
    });

    // Sort songs
    if (sortBy === "title") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "artist") {
      filtered = [...filtered].sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (sortBy === "genre") {
      filtered = [...filtered].sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (sortBy === "mood") {
      filtered = [...filtered].sort((a, b) => a.mood.localeCompare(b.mood));
    }

    return filtered;
  };

  const filteredSongs = getFilteredAndSortedSongs();
  const hasActiveFilters = searchQuery || selectedGenre !== "All" || selectedMood !== "All" || sortBy !== "default";

  // Update play queue when shuffle changes
  useEffect(() => {
    if (isShuffle) {
      const shuffled = [...Array(songs.length).keys()]
        .filter((i) => i !== currentSongIndex)
        .sort(() => Math.random() - 0.5);
      setPlayQueue([currentSongIndex, ...shuffled]);
    } else {
      setPlayQueue([...Array(songs.length).keys()]);
    }
  }, [isShuffle, currentSongIndex]);

  const addToPlaylist = (songId) => {
    if (!playlist.includes(songId)) {
      setPlaylist([...playlist, songId]);
    }
  };

  const removeFromPlaylist = (songId) => {
    setPlaylist(playlist.filter((id) => id !== songId));
  };

  const playFromPlaylist = (songId) => {
    const index = songs.findIndex((s) => s.id === songId);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="app-layout">
      <Header 
        showPlaylist={showPlaylist}
        setShowPlaylist={setShowPlaylist}
        playlistCount={playlist.length}
      />
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FilterBar
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {hasActiveFilters && filteredSongs.length > 0 && (
        <ResultsCounter count={filteredSongs.length} total={songs.length} />
      )}
      {filteredSongs.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <p>No songs found</p>
          <span>Try adjusting your search or filters</span>
        </div>
      ) : (
        <SongList
          songs={filteredSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          setIsPlaying={setIsPlaying}
          addToPlaylist={addToPlaylist}
          playlist={playlist}
          allSongs={songs}
        />
      )}
      <Player
        song={songs[currentSongIndex]}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSongIndex={setCurrentSongIndex}
        songs={songs}
        isShuffle={isShuffle}
        setIsShuffle={setIsShuffle}
        repeatMode={repeatMode}
        setRepeatMode={setRepeatMode}
        playQueue={playQueue}
        currentSongIndex={currentSongIndex}
      />
      {showPlaylist && (
        <Playlist
          playlist={playlist}
          songs={songs}
          removeFromPlaylist={removeFromPlaylist}
          playFromPlaylist={playFromPlaylist}
          currentSongIndex={currentSongIndex}
          onClose={() => setShowPlaylist(false)}
        />
      )}
    </div>
  );
}

export default App;
