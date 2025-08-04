import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Filter, SortAsc } from 'lucide-react';
import TrackList from './TrackList';

const LibraryContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const LibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const HeaderLeft = styled.div`
  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 16px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: 2px;
`;

const ViewButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'black' : props.theme.colors.textSecondary};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.active ? 'black' : props.theme.colors.text};
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterTag = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundTertiary};
  color: ${props => props.active ? 'black' : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 14px;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primaryHover : props.theme.colors.hover};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  
  h3 {
    font-size: 28px;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
  }
`;

const LibraryContent = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const LibraryView = ({ playlist, onTrackPlay, currentTrack }) => {
  const [viewMode, setViewMode] = useState('list');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const filters = [
    { id: 'all', label: 'All', count: playlist.length },
    { id: 'recently-played', label: 'Recently Played', count: 5 },
    { id: 'liked', label: 'Liked Songs', count: 12 },
    { id: 'downloaded', label: 'Downloaded', count: 3 },
  ];

  const getFilteredTracks = () => {
    let filtered = [...playlist];
    
    // Apply filters
    if (activeFilter !== 'all') {
      // For demo purposes, just return all tracks
      // In a real app, you'd filter based on the actual criteria
      filtered = playlist;
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'album':
          return a.album.localeCompare(b.album);
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  const getTotalDuration = () => {
    return playlist.reduce((total, track) => total + track.duration, 0);
  };

  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getUniqueArtists = () => {
    return new Set(playlist.map(track => track.artist)).size;
  };

  const filteredTracks = getFilteredTracks();

  return (
    <LibraryContainer>
      <LibraryHeader>
        <HeaderLeft>
          <h1>Your Library</h1>
          <p>{playlist.length} songs • {formatTotalDuration(getTotalDuration())}</p>
        </HeaderLeft>
        
        <HeaderRight>
          <FilterButton onClick={() => {}}>
            <Filter size={16} />
            Filter
          </FilterButton>
          
          <FilterButton onClick={() => {}}>
            <SortAsc size={16} />
            Sort
          </FilterButton>
          
          <ViewToggle>
            <ViewButton 
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </ViewButton>
            <ViewButton 
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </ViewButton>
          </ViewToggle>
        </HeaderRight>
      </LibraryHeader>

      <StatsSection>
        <StatCard>
          <h3>{playlist.length}</h3>
          <p>Total Songs</p>
        </StatCard>
        <StatCard>
          <h3>{getUniqueArtists()}</h3>
          <p>Artists</p>
        </StatCard>
        <StatCard>
          <h3>{new Set(playlist.map(track => track.album)).size}</h3>
          <p>Albums</p>
        </StatCard>
        <StatCard>
          <h3>{formatTotalDuration(getTotalDuration())}</h3>
          <p>Total Duration</p>
        </StatCard>
      </StatsSection>

      <FilterSection>
        {filters.map(filter => (
          <FilterTag
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label} ({filter.count})
          </FilterTag>
        ))}
      </FilterSection>

      <LibraryContent>
        <TrackList 
          tracks={filteredTracks}
          onTrackPlay={onTrackPlay}
          currentTrack={currentTrack}
        />
      </LibraryContent>
    </LibraryContainer>
  );
};

export default LibraryView;
