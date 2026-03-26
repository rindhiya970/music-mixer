import "./SongCard.css";

function SongCard({ song, isCurrent, handlePlay }) {
  return (
    <div
      onClick={() => handlePlay(song.id)}
      className={`song-card ${isCurrent ? "current" : ""}`}
    >
      <img src={song.cover} alt={song.title} />
      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
    </div>
  );
}

export default SongCard;
