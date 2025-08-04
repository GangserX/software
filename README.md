# Spotify Clone - Desktop Music Player

A desktop music player application built with Electron and React, inspired by Spotify's interface.

## Features

### 🎵 Core Music Player
- **Play/Pause/Skip Controls**: Full media control functionality
- **Volume Control**: Adjustable volume with mute option
- **Progress Bar**: Visual playback progress with seek functionality
- **Track Information**: Display current song, artist, and album

### 🎨 Modern Interface
- **Spotify-inspired Design**: Dark theme with green accents
- **Responsive Layout**: Sidebar navigation and main content area
- **Album Art Display**: Visual representation for music tracks
- **Smooth Animations**: Hover effects and transitions

### 📁 Music Management
- **Library View**: Browse your complete music collection
- **Search Functionality**: Find songs, artists, and albums
- **Playlist Support**: Create and manage custom playlists
- **Recently Played**: Quick access to recent tracks

### 🔧 Technical Features
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Native Desktop App**: Built with Electron for native performance
- **React Components**: Modular and maintainable UI components
- **Audio Format Support**: MP3, WAV, FLAC, OGG support

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spotify-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your music files**
   - Place your music files in the `assets/sample-music/` directory
   - Update the track list in `src/renderer/App.js` to reference your files

4. **Start the application**
   ```bash
   npm start
   ```

## Project Structure

```
spotify-clone/
├── src/
│   ├── components/         # React components
│   │   ├── Sidebar.js     # Navigation sidebar
│   │   ├── MainContent.js # Main content area
│   │   ├── HomeView.js    # Home page view
│   │   ├── SearchView.js  # Search functionality
│   │   ├── LibraryView.js # Music library
│   │   ├── TrackList.js   # Track listing component
│   │   └── PlayerControls.js # Bottom player controls
│   ├── renderer/          # React application
│   │   ├── App.js         # Main App component
│   │   └── index.js       # React entry point
│   ├── styles/            # Styling and themes
│   │   ├── theme.js       # Theme configuration
│   │   └── global.css     # Global styles
│   ├── utils/             # Utility functions
│   ├── index.html         # Main HTML file
│   ├── index.js           # Electron main process
│   ├── index.css          # Base styles
│   └── app.js             # Simplified React app
├── assets/                # Static assets
│   └── sample-music/      # Music files directory
├── .github/               # GitHub configuration
│   └── copilot-instructions.md # Copilot guidelines
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Scripts

- `npm start` - Start the Electron application
- `npm run package` - Package the app for distribution
- `npm run make` - Create distributable packages

## Usage

### Adding Music
1. Place your music files in the `assets/sample-music/` directory
2. Update the `sampleTracks` array in `App.js` with your file information
3. Restart the application

### Navigation
- **Home**: Featured music and recently played tracks
- **Search**: Find music in your library
- **Your Library**: Complete music collection with filtering options

### Player Controls
- Click any track to start playing
- Use the bottom player bar for playback controls
- Adjust volume using the volume slider
- Click on the progress bar to seek to specific positions

## Customization

### Themes
Edit `src/styles/theme.js` to customize colors and styling:
```javascript
export const darkTheme = {
  colors: {
    primary: '#1db954',      // Spotify green
    background: '#121212',   // Dark background
    text: '#ffffff',         // White text
    // ... more colors
  }
};
```

### Adding Features
The modular component structure makes it easy to add new features:
- Create new components in `src/components/`
- Add new views to `MainContent.js`
- Extend the player functionality in `PlayerControls.js`

## Building for Production

### Package for Current Platform
```bash
npm run package
```

### Create Installer
```bash
npm run make
```

This will create distributable files in the `out/` directory.

## Technical Implementation

### Audio Handling
- Uses HTML5 Audio API for playback
- Supports common audio formats (MP3, WAV, FLAC, OGG)
- Implements proper error handling for missing files

### State Management
- React hooks for local component state
- Props drilling for shared state (can be upgraded to Context API or Redux)

### Styling
- Styled-components for component-level styling
- CSS-in-JS approach for dynamic theming
- Responsive design principles

## Browser Compatibility

Since this runs in Electron, it uses Chromium's latest features:
- ES6+ JavaScript features
- Modern CSS properties
- WebAudio API capabilities

## Future Enhancements

### Planned Features
- [ ] Playlist import/export
- [ ] Keyboard shortcuts
- [ ] Mini player mode
- [ ] Audio visualizer
- [ ] Last.fm integration
- [ ] Music metadata editing
- [ ] Smart playlists
- [ ] Cloud storage sync

### Technical Improvements
- [ ] Add proper build system (Webpack/Vite)
- [ ] Implement proper state management
- [ ] Add unit tests
- [ ] Improve accessibility
- [ ] Add error boundaries
- [ ] Implement proper logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or as a base for your own music player.

## Acknowledgments

- Inspired by Spotify's user interface design
- Built with Electron and React
- Uses Lucide React for icons
- Styled-components for styling

---

**Note**: This is a learning project and not affiliated with Spotify. All Spotify trademarks belong to Spotify AB.
