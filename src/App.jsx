import { useState } from "react";
import Header from "./components/Header";
import SongList from "./components/SongList";
import Player from "./components/Player.jsx";
import { songs } from "./data";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <Header />
      <SongList
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        setIsPlaying={setIsPlaying}
      />
      <Player
        song={songs[currentSongIndex]}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSongIndex={setCurrentSongIndex}
        songs={songs}
      />
    </div>
  );
}

export default App;
