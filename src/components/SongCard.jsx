import { FaPlus, FaCheck } from "react-icons/fa";
import "./SongCard.css";

function SongCard({ song, isCurrent, handlePlay, addToPlaylist, isInPlaylist }) {
  return (
    <div
      className={`song-card ${isCurrent ? "current" : ""}`}
      style={{ "--card-accent": song.color }}
      role="button"
      tabIndex={0}
      aria-label={`Play ${song.title} by ${song.artist}`}
    >
      <div className="card-img-wrap" onClick={() => handlePlay(song.id)}>
        <img src={song.cover} alt={song.title} />
        <div className="play-overlay">▶</div>
      </div>
      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
      <button 
        className={`add-to-playlist-btn ${isInPlaylist ? "added" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          addToPlaylist(song.id);
        }}
        aria-label={isInPlaylist ? "Added to playlist" : "Add to playlist"}
        title={isInPlaylist ? "Added to playlist" : "Add to playlist"}
      >
        {isInPlaylist ? <FaCheck /> : <FaPlus />}
      </button>
      {isCurrent && <div className="now-playing-bar"><span /><span /><span /></div>}
    </div>
  );
}

export default SongCard;
