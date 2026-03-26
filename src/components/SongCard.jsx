function SongCard({ song, isCurrent, handlePlay }) {
  return (
    <div
      onClick={() => handlePlay(song.id)}
      className="song-card"
      style={{ border: isCurrent ? "3px solid #ff6f61" : "none" }}
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

