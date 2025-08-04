import React from 'react';
import styled from 'styled-components';
import { Play, Pause } from 'lucide-react';
import TrackList from './TrackList';

const HomeContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Greeting = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 18px;
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const RecentlyPlayedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const AlbumCard = styled.div`
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
    
    .play-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AlbumArt = styled.div`
  width: 100%;
  height: 160px;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryHover});
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '♪';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 64px;
    opacity: 0.3;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(8px);
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: scale(1.05);
  }
  
  svg {
    color: black;
    margin-left: ${props => props.playing ? '0' : '2px'};
  }
`;

const AlbumInfo = styled.div`
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
  }
`;

const HomeView = ({ playlist, onTrackPlay, currentTrack }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Group tracks by album for display
  const albums = playlist.reduce((acc, track) => {
    if (!acc[track.album]) {
      acc[track.album] = {
        album: track.album,
        artist: track.artist,
        tracks: [],
        cover: track.cover
      };
    }
    acc[track.album].tracks.push(track);
    return acc;
  }, {});

  return (
    <HomeContainer>
      <Header>
        <Greeting>{getGreeting()}</Greeting>
        <Subtitle>Ready to discover some amazing music?</Subtitle>
      </Header>

      <Section>
        <SectionTitle>Recently Played</SectionTitle>
        <RecentlyPlayedGrid>
          {Object.values(albums).map((album, index) => (
            <AlbumCard key={index}>
              <AlbumArt>
                <PlayButton 
                  className="play-button"
                  playing={currentTrack?.album === album.album}
                  onClick={() => onTrackPlay(album.tracks[0], index)}
                >
                  {currentTrack?.album === album.album ? <Pause size={20} /> : <Play size={20} />}
                </PlayButton>
              </AlbumArt>
              <AlbumInfo>
                <h3>{album.album}</h3>
                <p>{album.artist}</p>
              </AlbumInfo>
            </AlbumCard>
          ))}
        </RecentlyPlayedGrid>
      </Section>

      <Section>
        <SectionTitle>Your Music</SectionTitle>
        <TrackList 
          tracks={playlist}
          onTrackPlay={onTrackPlay}
          currentTrack={currentTrack}
        />
      </Section>
    </HomeContainer>
  );
};

export default HomeView;
