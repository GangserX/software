import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import PlayerControls from '../components/PlayerControls';
import { darkTheme } from '../styles/theme';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [activeView, setActiveView] = useState('home');
  
  const audioRef = useRef(null);

  // Sample tracks - In a real app, this would come from file system scanning
  const sampleTracks = [
    {
      id: 1,
      title: "Sample Track 1",
      artist: "Sample Artist",
      album: "Sample Album",
      duration: 180,
      src: "assets/sample-music/sample1.mp3", // Placeholder
      cover: "assets/covers/sample1.jpg"
    },
    {
      id: 2,
      title: "Demo Song",
      artist: "Demo Artist",
      album: "Demo Collection",
      duration: 210,
      src: "assets/sample-music/sample2.mp3", // Placeholder
      cover: "assets/covers/sample2.jpg"
    },
    {
      id: 3,
      title: "Test Music",
      artist: "Test Band",
      album: "Test Album",
      duration: 195,
      src: "assets/sample-music/sample3.mp3", // Placeholder
      cover: "assets/covers/sample3.jpg"
    }
  ];

  useEffect(() => {
    setPlaylist(sampleTracks);
  }, []);

  const playTrack = (track, playlistIndex = 0) => {
    setCurrentTrack(track);
    setCurrentPlaylistIndex(playlistIndex);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentPlaylistIndex + 1) % playlist.length;
    if (playlist[nextIndex]) {
      playTrack(playlist[nextIndex], nextIndex);
    }
  };

  const previousTrack = () => {
    const prevIndex = currentPlaylistIndex === 0 ? playlist.length - 1 : currentPlaylistIndex - 1;
    if (playlist[prevIndex]) {
      playTrack(playlist[prevIndex], prevIndex);
    }
  };

  const seek = (time) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <MainLayout>
          <Sidebar 
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <MainContent 
            activeView={activeView}
            playlist={playlist}
            onTrackPlay={playTrack}
            currentTrack={currentTrack}
          />
        </MainLayout>
        <PlayerControls
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          volume={volume}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={togglePlayPause}
          onNext={nextTrack}
          onPrevious={previousTrack}
          onVolumeChange={setVolume}
          onSeek={seek}
          audioRef={audioRef}
          setCurrentTime={setCurrentTime}
          setDuration={setDuration}
        />
        {/* Hidden audio element for playback */}
        <audio
          ref={audioRef}
          src={currentTrack?.src}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={nextTrack}
          volume={volume}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
