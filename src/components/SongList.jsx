import SongCard from "./SongCard";
import "./SongList.css";

function SongList({ songs, currentSongIndex, setCurrentSongIndex, setIsPlaying, addToPlaylist, playlist, allSongs }) {
  const handlePlay = (id) => {
    // Find index in the full song list, not filtered list
    const index = allSongs.findIndex((s) => s.id === id);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="song-list">
      {songs.map((song) => {
        const index = allSongs.findIndex((s) => s.id === song.id);
        return (
          <SongCard
            key={song.id}
            song={song}
            isCurrent={index === currentSongIndex}
            handlePlay={handlePlay}
            addToPlaylist={addToPlaylist}
            isInPlaylist={playlist.includes(song.id)}
          />
        );
      })}
    </div>
  );
}

export default SongList;
