# Copilot Instructions for Spotify Clone

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Spotify clone desktop application built with Electron and React. The app provides a native desktop music player experience with the following features:

### Core Features
- **Music Player**: Play, pause, skip, previous, volume control
- **Playlist Management**: Create, edit, delete playlists
- **Music Library**: Browse and organize music files
- **Search**: Search through music library
- **Modern UI**: Spotify-inspired dark theme interface

### Technology Stack
- **Electron**: Desktop application framework
- **React**: Frontend UI library
- **Styled-components**: CSS-in-JS styling
- **Lucide React**: Icon library
- **HTML5 Audio API**: Audio playback

### File Structure
- `src/index.js`: Main Electron process
- `src/renderer/`: React application files
- `src/components/`: Reusable React components
- `src/styles/`: Global styles and themes
- `src/utils/`: Utility functions
- `assets/`: Images, icons, sample music files

### Coding Guidelines
- Use functional React components with hooks
- Implement responsive design principles
- Follow React best practices for state management
- Use semantic HTML for accessibility
- Implement proper error handling for file operations
- Ensure cross-platform compatibility (Windows, Mac, Linux)

### Audio Handling
- Support common audio formats (MP3, WAV, FLAC, OGG)
- Implement proper audio file scanning and metadata extraction
- Handle audio playback errors gracefully
- Provide visual feedback for audio loading states
