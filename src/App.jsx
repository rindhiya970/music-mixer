import { useState } from "react";
import Header from "./components/Header";
import SongList from "./components/SongList";
import Player from "./components/Player";
import { songs } from "./data";
import "./App.css";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="app-layout">
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
