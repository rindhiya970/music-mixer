import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import "./Player.css";

function Player({ song, isPlaying, setIsPlaying, setCurrentSongIndex, songs }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [song]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player">
      <img
        src={song.cover}
        alt={song.title}
        className={`album-cover ${isPlaying ? "playing" : ""}`}
      />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>

      <div className="progress-container" onClick={handleSeek}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button onClick={handlePrev}>
          <FaBackward />
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="play-btn">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNext}>
          <FaForward />
        </button>
      </div>

      <audio ref={audioRef} src={song.url}></audio>
    </div>
  );
}

export default Player;
