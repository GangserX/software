import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX,
  Heart,
  PictureInPicture
} from 'lucide-react';

const PlayerContainer = styled.div`
  height: 90px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  min-width: 0;
`;

const AlbumArt = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
`;

const TrackDetails = styled.div`
  min-width: 0;
  flex: 1;
  
  h4 {
    color: ${props => props.theme.colors.text};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TrackActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const IconButton = styled.button`
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.hover};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
  }
`;

const PlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const PlayButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
  }
  
  svg {
    color: ${props => props.theme.colors.background};
    margin-left: ${props => props.playing ? '0' : '1px'};
  }
`;

const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  max-width: 600px;
`;

const TimeDisplay = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 11px;
  min-width: 40px;
  text-align: center;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  
  &:hover .progress-thumb {
    opacity: 1;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => props.theme.colors.text};
  border-radius: 2px;
  position: relative;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

const ProgressThumb = styled.div`
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: ${props => props.theme.colors.text};
  border-radius: 50%;
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.fast};
`;

const VolumeControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  justify-self: end;
`;

const VolumeBar = styled.div`
  width: 100px;
  height: 4px;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: 2px;
  position: relative;
  cursor: pointer;
`;

const VolumeFill = styled.div`
  height: 100%;
  background-color: ${props => props.theme.colors.text};
  border-radius: 2px;
  width: ${props => props.volume * 100}%;
  transition: width 0.1s ease;
`;

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PlayerControlsComponent = ({
  currentTrack,
  isPlaying,
  volume,
  currentTime,
  duration,
  onPlayPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onSeek,
  audioRef,
  setCurrentTime,
  setDuration
}) => {
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'all', 'one'
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  const handleVolumeClick = (e) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  const toggleRepeat = () => {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return (
      <PlayerContainer>
        <div></div>
        <PlayerControls>
          <ControlButtons>
            <IconButton disabled>
              <Shuffle size={16} />
            </IconButton>
            <IconButton disabled>
              <SkipBack size={16} />
            </IconButton>
            <PlayButton disabled>
              <Play size={16} />
            </PlayButton>
            <IconButton disabled>
              <SkipForward size={16} />
            </IconButton>
            <IconButton disabled>
              <Repeat size={16} />
            </IconButton>
          </ControlButtons>
        </PlayerControls>
        <div></div>
      </PlayerContainer>
    );
  }

  return (
    <PlayerContainer>
      {/* Track Info */}
      <TrackInfo>
        <AlbumArt>♪</AlbumArt>
        <TrackDetails>
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </TrackDetails>
        <TrackActions>
          <IconButton>
            <Heart size={16} />
          </IconButton>
          <IconButton>
            <PictureInPicture size={16} />
          </IconButton>
        </TrackActions>
      </TrackInfo>

      {/* Player Controls */}
      <PlayerControls>
        <ControlButtons>
          <IconButton 
            className={isShuffleOn ? 'active' : ''}
            onClick={() => setIsShuffleOn(!isShuffleOn)}
          >
            <Shuffle size={16} />
          </IconButton>
          <IconButton onClick={onPrevious}>
            <SkipBack size={16} />
          </IconButton>
          <PlayButton playing={isPlaying} onClick={onPlayPause}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </PlayButton>
          <IconButton onClick={onNext}>
            <SkipForward size={16} />
          </IconButton>
          <IconButton 
            className={repeatMode !== 'none' ? 'active' : ''}
            onClick={toggleRepeat}
          >
            <Repeat size={16} />
          </IconButton>
        </ControlButtons>
        
        <ProgressSection>
          <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
          <ProgressBar onClick={handleProgressClick}>
            <ProgressFill progress={progress}>
              <ProgressThumb className="progress-thumb" />
            </ProgressFill>
          </ProgressBar>
          <TimeDisplay>{formatTime(duration)}</TimeDisplay>
        </ProgressSection>
      </PlayerControls>

      {/* Volume Controls */}
      <VolumeControls>
        <IconButton onClick={toggleMute}>
          {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </IconButton>
        <VolumeBar onClick={handleVolumeClick}>
          <VolumeFill volume={isMuted ? 0 : volume} />
        </VolumeBar>
      </VolumeControls>
    </PlayerContainer>
  );
};

export default PlayerControlsComponent;
