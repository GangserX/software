import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import TrackList from './TrackList';

const SearchContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const SearchHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchInputContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 50px;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  transition: all ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
`;

const SearchTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const ResultsSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const ResultsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textSecondary};
  
  h3 {
    font-size: 20px;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const BrowseSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const GenreCard = styled.div`
  background: ${props => props.color || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  height: 120px;
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
  }
  
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const SearchView = ({ playlist, onTrackPlay, currentTrack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Filter tracks based on search query
    const results = playlist.filter(track =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const genres = [
    { name: 'Pop', color: '#ff6b6b' },
    { name: 'Rock', color: '#4ecdc4' },
    { name: 'Hip Hop', color: '#45b7d1' },
    { name: 'Jazz', color: '#f9ca24' },
    { name: 'Classical', color: '#6c5ce7' },
    { name: 'Electronic', color: '#a29bfe' },
    { name: 'Country', color: '#fd79a8' },
    { name: 'R&B', color: '#fdcb6e' },
  ];

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>Search</SearchTitle>
        <SearchInputContainer>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SearchInputContainer>
      </SearchHeader>

      {searchQuery && (
        <ResultsSection>
          <ResultsTitle>
            {searchResults.length > 0 
              ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`
              : 'No results found'
            }
          </ResultsTitle>
          
          {searchResults.length > 0 ? (
            <TrackList 
              tracks={searchResults}
              onTrackPlay={onTrackPlay}
              currentTrack={currentTrack}
            />
          ) : (
            <NoResults>
              <h3>No results found for "{searchQuery}"</h3>
              <p>Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
            </NoResults>
          )}
        </ResultsSection>
      )}

      {!searchQuery && (
        <BrowseSection>
          <ResultsTitle>Browse All</ResultsTitle>
          <GenreGrid>
            {genres.map((genre, index) => (
              <GenreCard key={index} color={genre.color}>
                <h3>{genre.name}</h3>
              </GenreCard>
            ))}
          </GenreGrid>
        </BrowseSection>
      )}
    </SearchContainer>
  );
};

export default SearchView;
