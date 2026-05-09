import SongCard from "./SongCard";
import "./SongList.css";

function SongList({ songs, currentSongIndex, setCurrentSongIndex, setIsPlaying, addToPlaylist, playlist }) {
  const handlePlay = (id) => {
    const index = songs.findIndex((s) => s.id === id);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <SongCard
          key={song.id}
          song={song}
          isCurrent={index === currentSongIndex}
          handlePlay={handlePlay}
          addToPlaylist={addToPlaylist}
          isInPlaylist={playlist.includes(song.id)}
        />
      ))}
    </div>
  );
}

export default SongList;
