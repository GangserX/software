import React from 'react';
import styled from 'styled-components';
import HomeView from './HomeView';
import SearchView from './SearchView';
import LibraryView from './LibraryView';

const MainContentContainer = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  overflow-y: auto;
  position: relative;
`;

const MainContent = ({ activeView, playlist, onTrackPlay, currentTrack }) => {
  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView
            playlist={playlist}
            onTrackPlay={onTrackPlay}
            currentTrack={currentTrack}
          />
        );
      case 'search':
        return (
          <SearchView
            playlist={playlist}
            onTrackPlay={onTrackPlay}
            currentTrack={currentTrack}
          />
        );
      case 'library':
        return (
          <LibraryView
            playlist={playlist}
            onTrackPlay={onTrackPlay}
            currentTrack={currentTrack}
          />
        );
      default:
        return (
          <HomeView
            playlist={playlist}
            onTrackPlay={onTrackPlay}
            currentTrack={currentTrack}
          />
        );
    }
  };

  return (
    <MainContentContainer>
      {renderView()}
    </MainContentContainer>
  );
};

export default MainContent;
