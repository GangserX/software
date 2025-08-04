// Simple Spotify Clone Application
const { useState, useEffect, useRef } = React;

// Simple styled components replacement
const styled = (component) => (styles) => (props) => {
  const className = `styled-${Math.random().toString(36).substr(2, 9)}`;
  
  // Inject styles
  if (!document.getElementById(className)) {
    const style = document.createElement('style');
    style.id = className;
    style.textContent = `.${className} { ${styles} }`;
    document.head.appendChild(style);
  }
  
  return React.createElement(component, {
    ...props,
    className: `${className} ${props.className || ''}`
  });
};

// Main App Component
const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeView, setActiveView] = useState('home');
  
  const audioRef = useRef(null);

  // Sample tracks
  const sampleTracks = [
    {
      id: 1,
      title: "Sample Track 1",
      artist: "Sample Artist",
      album: "Sample Album",
      duration: 180,
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample audio
    },
    {
      id: 2,
      title: "Demo Song",
      artist: "Demo Artist", 
      album: "Demo Collection",
      duration: 210,
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample audio
    }
  ];

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#121212',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: {
        padding: '20px',
        borderBottom: '1px solid #282828',
        textAlign: 'center'
      }
    }, [
      React.createElement('h1', {
        key: 'title',
        style: {
          margin: 0,
          background: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '32px'
        }
      }, '🎵 Spotify Clone'),
      React.createElement('p', {
        key: 'subtitle',
        style: { color: '#a7a7a7', margin: '10px 0 0 0' }
      }, 'Your Music, Your Way')
    ]),

    // Main Content
    React.createElement('div', {
      key: 'main',
      style: {
        flex: 1,
        display: 'flex',
        overflow: 'hidden'
      }
    }, [
      // Sidebar
      React.createElement('div', {
        key: 'sidebar',
        style: {
          width: '240px',
          backgroundColor: '#1e1e1e',
          padding: '20px',
          borderRight: '1px solid #282828'
        }
      }, [
        React.createElement('h3', {
          key: 'nav-title',
          style: { color: '#ffffff', marginBottom: '20px' }
        }, 'Navigation'),
        React.createElement('div', {
          key: 'nav-home',
          style: {
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: activeView === 'home' ? '#1db954' : 'transparent',
            borderRadius: '4px',
            marginBottom: '5px'
          },
          onClick: () => setActiveView('home')
        }, '🏠 Home'),
        React.createElement('div', {
          key: 'nav-library',
          style: {
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: activeView === 'library' ? '#1db954' : 'transparent',
            borderRadius: '4px',
            color: '#a7a7a7'
          },
          onClick: () => setActiveView('library')
        }, '📚 Your Library')
      ]),

      // Content Area
      React.createElement('div', {
        key: 'content',
        style: {
          flex: 1,
          padding: '20px',
          overflowY: 'auto'
        }
      }, [
        React.createElement('h2', {
          key: 'content-title',
          style: { marginBottom: '20px' }
        }, activeView === 'home' ? 'Featured Music' : 'Your Library'),
        
        // Track List
        React.createElement('div', {
          key: 'track-list',
          style: {
            backgroundColor: '#282828',
            borderRadius: '8px',
            padding: '20px'
          }
        }, sampleTracks.map((track, index) => 
          React.createElement('div', {
            key: track.id,
            style: {
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: currentTrack?.id === track.id ? '#535353' : 'transparent',
              marginBottom: '5px'
            },
            onClick: () => playTrack(track)
          }, [
            React.createElement('div', {
              key: 'track-number',
              style: {
                width: '30px',
                textAlign: 'center',
                color: '#a7a7a7'
              }
            }, index + 1),
            React.createElement('div', {
              key: 'track-info',
              style: { flex: 1, marginLeft: '15px' }
            }, [
              React.createElement('div', {
                key: 'track-title',
                style: {
                  fontWeight: 'bold',
                  color: currentTrack?.id === track.id ? '#1db954' : '#ffffff'
                }
              }, track.title),
              React.createElement('div', {
                key: 'track-artist',
                style: { color: '#a7a7a7', fontSize: '14px' }
              }, track.artist)
            ]),
            React.createElement('div', {
              key: 'track-album',
              style: { color: '#a7a7a7', marginRight: '20px' }
            }, track.album)
          ])
        ))
      ])
    ]),

    // Player Controls
    React.createElement('div', {
      key: 'player',
      style: {
        height: '90px',
        backgroundColor: '#1e1e1e',
        borderTop: '1px solid #282828',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
      }
    }, [
      // Track Info
      React.createElement('div', {
        key: 'current-track',
        style: { flex: 1 }
      }, currentTrack ? [
        React.createElement('div', {
          key: 'current-title',
          style: { fontWeight: 'bold' }
        }, currentTrack.title),
        React.createElement('div', {
          key: 'current-artist',
          style: { color: '#a7a7a7', fontSize: '14px' }
        }, currentTrack.artist)
      ] : 'No track selected'),

      // Control Buttons
      React.createElement('div', {
        key: 'controls',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }
      }, [
        React.createElement('button', {
          key: 'play-button',
          style: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#1db954',
            border: 'none',
            color: 'black',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          onClick: togglePlayPause,
          disabled: !currentTrack
        }, isPlaying ? '⏸️' : '▶️')
      ]),

      // Volume
      React.createElement('div', {
        key: 'volume',
        style: {
          flex: 1,
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px'
        }
      }, [
        React.createElement('span', { key: 'volume-icon' }, '🔊'),
        React.createElement('input', {
          key: 'volume-slider',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.1,
          value: volume,
          onChange: (e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            if (audioRef.current) {
              audioRef.current.volume = newVolume;
            }
          },
          style: { width: '100px' }
        })
      ])
    ]),

    // Hidden Audio Element
    React.createElement('audio', {
      key: 'audio',
      ref: audioRef,
      onTimeUpdate: (e) => setCurrentTime(e.target.currentTime),
      onLoadedMetadata: (e) => setDuration(e.target.duration),
      volume: volume
    })
  ]);
};

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
