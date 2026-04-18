import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import "./Player.css";

function Player({ song, isPlaying, setIsPlaying, setCurrentSongIndex, songs }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reload audio and play/pause when song changes
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = song.url;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [song]);

  // Play/pause toggle without reloading
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleNext);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleNext);
    };
  }, [song, songs]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const seekTime = ((e.clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="player" style={{ "--accent": song.color }}>
      <div className={`vinyl-wrapper ${isPlaying ? "spinning" : ""}`}>
        <img src={song.cover} alt={song.title} className="album-cover" />
        <div className="vinyl-hole" />
      </div>

      <h3 className="song-title">{song.title}</h3>
      <p className="song-artist">{song.artist}</p>

      <div className="progress-container" onClick={handleSeek}>
        <div className="progress" style={{ width: `${progress}%` }} />
        <div className="progress-thumb" style={{ left: `${progress}%` }} />
      </div>
      <div className="time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button className="ctrl-btn" onClick={handlePrev} aria-label="Previous">
          <FaBackward />
        </button>
        <button className="ctrl-btn play-btn" onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="ctrl-btn" onClick={handleNext} aria-label="Next">
          <FaForward />
        </button>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default Player;
