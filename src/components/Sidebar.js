import React from 'react';
import styled from 'styled-components';
import { Home, Search, Library, Plus, Heart, Music } from 'lucide-react';

const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${props => props.theme.colors.border};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: 24px;
  font-weight: bold;
  
  svg {
    margin-right: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.primary};
  }
`;

const NavSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text};
  }
  
  svg {
    margin-right: ${props => props.theme.spacing.md};
    width: 20px;
    height: 20px;
  }
`;

const PlaylistSection = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const PlaylistItem = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};
  margin-bottom: ${props => props.theme.spacing.xs};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text};
  }
`;

const CreatePlaylistButton = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text};
  }
  
  svg {
    margin-right: ${props => props.theme.spacing.md};
    width: 20px;
    height: 20px;
  }
`;

const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const playlists = [
    'Liked Songs',
    'My Playlist #1',
    'Chill Mix',
    'Workout Hits',
    'Study Focus',
  ];

  return (
    <SidebarContainer>
      <Logo>
        <Music />
        Spotify Clone
      </Logo>

      <NavSection>
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <NavItem
              key={item.id}
              active={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            >
              <IconComponent />
              {item.label}
            </NavItem>
          );
        })}
      </NavSection>

      <PlaylistSection>
        <SectionTitle>Playlists</SectionTitle>

        <CreatePlaylistButton>
          <Plus />
          Create Playlist
        </CreatePlaylistButton>

        <PlaylistItem>
          <Heart size={16} style={{ marginRight: '12px', display: 'inline' }} />
          Liked Songs
        </PlaylistItem>

        {playlists.slice(1).map((playlist, index) => (
          <PlaylistItem key={index}>
            {playlist}
          </PlaylistItem>
        ))}
      </PlaylistSection>
    </SidebarContainer>
  );
};

export default Sidebar;
