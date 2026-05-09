import { FaListUl } from "react-icons/fa";
import "./Header.css";

function Header({ showPlaylist, setShowPlaylist, playlistCount }) {
  return (
    <header className="header">
      <div className="header-emoji">🎵</div>
      <h1>Vibe Player</h1>
      <p className="header-sub">your music, your mood ✨</p>
      <div className="header-actions">
        <div className="song-count">20 tracks ready to play</div>
        <button 
          className="playlist-toggle"
          onClick={() => setShowPlaylist(!showPlaylist)}
          aria-label="Toggle Playlist"
        >
          <FaListUl />
          <span>My Playlist</span>
          {playlistCount > 0 && <span className="playlist-badge">{playlistCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;
