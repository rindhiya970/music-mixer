import "./SongCard.css";

function SongCard({ song, isCurrent, handlePlay }) {
  return (
    <div
      onClick={() => handlePlay(song.id)}
      className={`song-card ${isCurrent ? "current" : ""}`}
      style={{ "--card-accent": song.color }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handlePlay(song.id)}
      aria-label={`Play ${song.title} by ${song.artist}`}
    >
      <div className="card-img-wrap">
        <img src={song.cover} alt={song.title} />
        <div className="play-overlay">▶</div>
      </div>
      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
      {isCurrent && <div className="now-playing-bar"><span /><span /><span /></div>}
    </div>
  );
}

export default SongCard;
