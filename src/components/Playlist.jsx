import { FaTimes, FaPlay, FaTrash } from "react-icons/fa";
import "./Playlist.css";

function Playlist({ playlist, songs, removeFromPlaylist, playFromPlaylist, currentSongIndex, onClose }) {
  const playlistSongs = playlist.map(id => songs.find(s => s.id === id)).filter(Boolean);

  return (
    <div className="playlist-overlay" onClick={onClose}>
      <div className="playlist-panel" onClick={(e) => e.stopPropagation()}>
        <div className="playlist-header">
          <h2>
            <span className="playlist-icon">🎶</span>
            My Playlist
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Close playlist">
            <FaTimes />
          </button>
        </div>
        
        <div className="playlist-content">
          {playlistSongs.length === 0 ? (
            <div className="empty-playlist">
              <div className="empty-icon">📭</div>
              <p>Your playlist is empty</p>
              <span>Add songs by clicking the + button on any track</span>
            </div>
          ) : (
            <div className="playlist-items">
              {playlistSongs.map((song, index) => {
                const songIndex = songs.findIndex(s => s.id === song.id);
                const isCurrent = songIndex === currentSongIndex;
                
                return (
                  <div 
                    key={song.id} 
                    className={`playlist-item ${isCurrent ? "current" : ""}`}
                    style={{ "--item-accent": song.color }}
                  >
                    <div className="playlist-item-number">{index + 1}</div>
                    <img src={song.cover} alt={song.title} className="playlist-item-cover" />
                    <div className="playlist-item-info">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                    </div>
                    <div className="playlist-item-actions">
                      <button 
                        className="playlist-action-btn play"
                        onClick={() => playFromPlaylist(song.id)}
                        aria-label="Play"
                        title="Play"
                      >
                        <FaPlay />
                      </button>
                      <button 
                        className="playlist-action-btn remove"
                        onClick={() => removeFromPlaylist(song.id)}
                        aria-label="Remove from playlist"
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {playlistSongs.length > 0 && (
          <div className="playlist-footer">
            <span>{playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlist;
