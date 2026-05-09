import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-emoji">🎵</div>
      <h1>Vibe Player</h1>
      <p className="header-sub">your music, your mood ✨</p>
      <div className="song-count">20 tracks ready to play</div>
    </header>
  );
}

export default Header;
