import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
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

  // Filter songs based on search query
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {filteredSongs.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <p>No songs found</p>
          <span>Try searching for something else</span>
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
