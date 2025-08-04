import React from 'react';
import styled from 'styled-components';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';

const TrackListContainer = styled.div`
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
`;

const TrackListHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 50px;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  span {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: bold;
  }
`;

const TrackRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 50px;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  align-items: center;
  background-color: ${props => props.isPlaying ? props.theme.colors.hover : 'transparent'};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    
    .track-number {
      opacity: 0;
    }
    
    .play-button {
      opacity: 1;
    }
  }
`;

const TrackNumber = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
  transition: opacity ${props => props.theme.transitions.fast};
`;

const PlayButtonCell = styled.button`
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: transparent;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    
    svg {
      color: black;
    }
  }
  
  svg {
    color: ${props => props.theme.colors.text};
    transition: color ${props => props.theme.transitions.fast};
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  
  .track-details {
    h4 {
      color: ${props => props.isPlaying ? props.theme.colors.primary : props.theme.colors.text};
      font-size: 14px;
      font-weight: 500;
      margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    p {
      color: ${props => props.theme.colors.textSecondary};
      font-size: 12px;
    }
  }
`;

const AlbumCell = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const DurationCell = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  text-align: right;
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.fast};
  
  ${TrackRow}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TrackList = ({ tracks, onTrackPlay, currentTrack }) => {
  return (
    <TrackListContainer>
      <TrackListHeader>
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>Duration</span>
        <span></span>
      </TrackListHeader>

      {tracks.map((track, index) => {
        const isPlaying = currentTrack?.id === track.id;

        return (
          <TrackRow
            key={track.id}
            isPlaying={isPlaying}
            onClick={() => onTrackPlay(track, index)}
          >
            <div style={{ position: 'relative' }}>
              <TrackNumber className="track-number">
                {isPlaying ? (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: `linear-gradient(45deg, ${isPlaying ? '#1db954' : '#fff'} 0%, ${isPlaying ? '#1ed760' : '#fff'} 100%)`,
                    borderRadius: '2px',
                    margin: '0 auto'
                  }} />
                ) : (
                  index + 1
                )}
              </TrackNumber>
              <PlayButtonCell className="play-button">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </PlayButtonCell>
            </div>

            <TrackInfo isPlaying={isPlaying}>
              <div className="track-details">
                <h4>{track.title}</h4>
                <p>{track.artist}</p>
              </div>
            </TrackInfo>

            <AlbumCell>{track.album}</AlbumCell>

            <DurationCell>
              {formatDuration(track.duration)}
            </DurationCell>

            <ActionsCell>
              <ActionButton>
                <Heart size={16} />
              </ActionButton>
              <ActionButton>
                <MoreHorizontal size={16} />
              </ActionButton>
            </ActionsCell>
          </TrackRow>
        );
      })}
    </TrackListContainer>
  );
};

export default TrackList;
