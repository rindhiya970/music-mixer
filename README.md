# 🎵 Vibe Player

A beautiful, feature-rich music player built with React and Vite. Enjoy your favorite tunes with a cute, modern interface!

## ✨ Features

### 🎶 Music Playback
- **20 Songs Library** - Expanded collection with creative titles and artists
- **Vinyl Animation** - Spinning record effect when playing
- **Progress Bar** - Seek to any point in the song
- **Time Display** - Current time and total duration

### 🎮 Playback Controls
- **Play/Pause** - Control playback with a beautiful gradient button
- **Next/Previous** - Navigate through your music
- **Shuffle Mode** - Randomize playback order
- **Repeat Modes** - Off, Repeat All, Repeat One
- **Volume Control** - Adjustable volume with mute option

### 📝 Playlist Management
- **Create Playlist** - Add your favorite songs
- **Remove Songs** - Manage your playlist easily
- **Play from Playlist** - Quick access to your favorites
- **Visual Indicators** - See which songs are in your playlist

### 🔍 Search & Filter
- **Real-time Search** - Find songs by title or artist
- **Clear Button** - Quick search reset
- **No Results State** - Friendly message when nothing matches




### 🎯 User Experience
- **Currently Playing Indicator** - Animated equalizer bars
- **Song Cards** - Beautiful album art display
- **Add to Playlist Button** - Quick access on hover
- **Playlist Badge** - Shows number of saved songs
- **Keyboard Accessible** - Full keyboard navigation support

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📁 Project Structure

```
music-player/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with title and playlist button
│   │   ├── SearchBar.jsx       # Search functionality
│   │   ├── SongList.jsx        # Grid of song cards
│   │   ├── SongCard.jsx        # Individual song card
│   │   ├── Player.jsx          # Main player controls
│   │   └── Playlist.jsx        # Playlist modal
│   ├── data.js                 # Song data
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── public/
│   ├── images/                 # Album covers
│   └── songs/                  # Audio files
└── package.json
```

## 🎨 Color Palette

The app uses a vibrant, cute color scheme:
- Primary: `#ff6f61` (Coral)
- Secondary: `#a78bfa` (Purple)
- Accent: `#34d399` (Green)
- Highlight: `#fbbf24` (Yellow)
- Background: Dark gradient (`#1a1a2e` → `#0f3460`)

## 🎵 Adding More Songs

To add more songs, edit `src/data.js`:

```javascript
{
  id: 21,
  title: "Your Song Title",
  artist: "Artist Name",
  url: "/songs/song21.mp3",
  cover: "/images/cover21.jpg",
  color: "#ff6f61"
}
```

Then add the corresponding audio file to `public/songs/` and cover image to `public/images/`.

## 🛠️ Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **React Icons** - Icon library
- **CSS3** - Styling with animations
- **HTML5 Audio API** - Audio playback

## 📱 Responsive Design

The player is fully responsive and works beautifully on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 Future Enhancements

- [ ] Add audio visualization
- [ ] Implement lyrics display
- [ ] Add equalizer controls
- [ ] Create multiple playlists
- [ ] Add favorites/like system
- [ ] Implement drag-and-drop playlist reordering
- [ ] Add keyboard shortcuts
- [ ] Create dark/light theme toggle

## 📄 License

MIT License - Feel free to use this project for learning or personal use!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Made with ❤️ and 🎵
