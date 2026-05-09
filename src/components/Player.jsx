import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedoAlt, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./Player.css";

function Player({ 
  song, 
  isPlaying, 
  setIsPlaying, 
  setCurrentSongIndex, 
  songs,
  isShuffle,
  setIsShuffle,
  repeatMode,
  setRepeatMode,
  playQueue,
  currentSongIndex
}) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  // Reload audio and play/pause when song changes
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = song.url;
    audio.load();
    audio.volume = volume / 100;
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

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song, songs, repeatMode, isShuffle, playQueue, currentSongIndex]);

  const handleEnded = () => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      const currentQueueIndex = playQueue.indexOf(currentSongIndex);
      const nextQueueIndex = (currentQueueIndex + 1) % playQueue.length;
      setCurrentSongIndex(playQueue[nextQueueIndex]);
    } else {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
      if (nextIndex === 0 && repeatMode === "off") {
        setIsPlaying(false);
        return;
      }
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      if (isShuffle) {
        const currentQueueIndex = playQueue.indexOf(currentSongIndex);
        const prevQueueIndex = (currentQueueIndex - 1 + playQueue.length) % playQueue.length;
        setCurrentSongIndex(playQueue[prevQueueIndex]);
      } else {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      }
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const seekTime = ((e.clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    const modes = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
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
        <button 
          className={`ctrl-btn shuffle-btn ${isShuffle ? "active" : ""}`}
          onClick={toggleShuffle} 
          aria-label="Shuffle"
          title={isShuffle ? "Shuffle: On" : "Shuffle: Off"}
        >
          <FaRandom />
        </button>
        <button className="ctrl-btn" onClick={handlePrev} aria-label="Previous">
          <FaBackward />
        </button>
        <button className="ctrl-btn play-btn" onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="ctrl-btn" onClick={handleNext} aria-label="Next">
          <FaForward />
        </button>
        <button 
          className={`ctrl-btn repeat-btn ${repeatMode !== "off" ? "active" : ""}`}
          onClick={toggleRepeat} 
          aria-label={`Repeat: ${repeatMode}`}
          title={`Repeat: ${repeatMode}`}
        >
          <FaRedoAlt />
          {repeatMode === "one" && <span className="repeat-indicator">1</span>}
        </button>
      </div>

      <div className="volume-control">
        <button 
          className="volume-btn"
          onClick={toggleMute}
          onMouseEnter={() => setShowVolume(true)}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <div 
          className={`volume-slider-container ${showVolume ? "show" : ""}`}
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume"
          />
          <span className="volume-value">{isMuted ? 0 : volume}%</span>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default Player;
