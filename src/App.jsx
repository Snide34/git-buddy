import React, { useState, useEffect } from 'react';
import { fetchLeetCodeData } from './services/leetcode';
import { fetchGitHubData } from './services/github';
import { calculateDailyScore } from './services/scoreEngine';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 0, 0, 0.3)'
          }}>
            <h1>⚠️ Error</h1>
            <p>{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()} style={{
              padding: '10px 20px',
              background: '#FF5F57',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState({
    leetcode: null,
    github: null,
    score: 0,
    streak: 0,
    loading: true,
    error: null
  });
  const [isMinimized, setIsMinimized] = useState(false);

  // Load config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  // Fetch data when config changes
  useEffect(() => {
    if (config) {
      if (config.leetcodeUsername || config.githubUsername) {
        fetchData();
        const interval = setInterval(fetchData, 30 * 60 * 1000);
        return () => clearInterval(interval);
      } else {
        loadMockData();
      }
    }
  }, [config]);

  const loadConfig = async () => {
    try {
      if (typeof window !== 'undefined' && window.electron) {
        const savedConfig = await window.electron.getConfig();
        setConfig(savedConfig || {
          leetcodeUsername: '',
          githubUsername: '',
          githubToken: '',
          autoLaunch: true
        });
      } else {
        setConfig({
          leetcodeUsername: '',
          githubUsername: '',
          githubToken: '',
          autoLaunch: true
        });
      }
    } catch (error) {
      console.error('Error loading config:', error);
      setConfig({
        leetcodeUsername: '',
        githubUsername: '',
        githubToken: '',
        autoLaunch: true
      });
    }
  };

  const loadMockData = async () => {
    try {
      const [leetcodeData, githubData] = await Promise.all([
        fetchLeetCodeData(''),
        fetchGitHubData('')
      ]);

      const score = calculateDailyScore(leetcodeData, githubData);

      setData({
        leetcode: leetcodeData,
        github: githubData,
        score,
        streak: 5,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error loading mock data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load data'
      }));
    }
  };

  const fetchData = async () => {
    if (!config?.leetcodeUsername && !config?.githubUsername) {
      loadMockData();
      return;
    }

    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [leetcodeData, githubData] = await Promise.all([
        config.leetcodeUsername ? fetchLeetCodeData(config.leetcodeUsername) : Promise.resolve(null),
        config.githubUsername ? fetchGitHubData(config.githubUsername, config.githubToken) : Promise.resolve(null)
      ]);

      const score = calculateDailyScore(leetcodeData, githubData);

      let streak = 5;
      if (window.electron) {
        try {
          const cachedStreak = await window.electron.getCache('streak');
          streak = cachedStreak || 5;
        } catch (e) {
          console.error('Error getting streak:', e);
        }
      }

      setData({
        leetcode: leetcodeData,
        github: githubData,
        score,
        streak,
        loading: false,
        error: null
      });

      if (window.electron) {
        try {
          await window.electron.saveCache('lastData', {
            leetcode: leetcodeData,
            github: githubData,
            score,
            streak,
            timestamp: Date.now()
          });
        } catch (e) {
          console.error('Error caching data:', e);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch data'
      }));
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <ErrorBoundary>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: transparent;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e4e2e4;
          overflow: hidden;
        }
        
        .glass-container {
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .glass-card-nested {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .github-glow {
          box-shadow: none;
        }
        
        .leetcode-glow {
          box-shadow: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 2px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 6px;
          overflow: hidden;
        }
        
        .heatmap-cell {
          border-radius: 2px;
          transition: all 0.2s ease;
          cursor: pointer;
          aspect-ratio: 1;
        }
        
        .heatmap-cell:hover {
          transform: scale(1.15);
          z-index: 10;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '-96px',
          left: '-96px',
          width: '384px',
          height: '384px',
          background: 'rgba(170, 199, 255, 0.05)',
          borderRadius: '9999px',
          filter: 'blur(120px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-96px',
          right: '-96px',
          width: '384px',
          height: '384px',
          background: 'rgba(255, 184, 104, 0.05)',
          borderRadius: '9999px',
          filter: 'blur(120px)'
        }}></div>
      </div>

      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        padding: '0',
        position: 'relative',
        zIndex: 10,
        background: 'rgba(15, 15, 18, 0.95)'
      }}>
        {/* Desktop Widget Container */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'rgba(15, 15, 18, 0.95)',
          backdropFilter: 'none',
          border: 'none',
          borderRadius: '0px',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          {/* Widget Header - macOS Style */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'grab'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#FF5F57',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 0 2px rgba(255, 95, 87, 0.3)'
              }} onClick={() => window.electron?.closeWindow()}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#FFBD2E',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 0 2px rgba(255, 189, 46, 0.3)'
              }} onClick={() => setIsMinimized(!isMinimized)}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#28CA42',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 0 2px rgba(40, 202, 66, 0.3)'
              }}></div>
            </div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#e4e2e4',
              flex: 1,
              textAlign: 'center'
            }}>DevPulse Pro</h3>
            <button
              onClick={handleRefresh}
              disabled={data.loading}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                color: '#aac7ff',
                cursor: data.loading ? 'not-allowed' : 'pointer',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '600',
                transition: 'all 0.2s',
                opacity: data.loading ? 0.5 : 1
              }}
              onMouseEnter={(e) => !data.loading && (e.target.style.background = 'rgba(255, 255, 255, 0.15)')}
              onMouseLeave={(e) => !data.loading && (e.target.style.background = 'rgba(255, 255, 255, 0.1)')}
            >
              {data.loading ? '⟳' : '↻'}
            </button>
          </div>

          {/* Widget Content */}
          {!isMinimized && (
            <div style={{
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: 1,
              overflowY: 'auto',
              width: '100%'
            }} className="hide-scrollbar">
              
              {/* LeetCode Mini Card */}
              <div style={{
                background: 'rgba(206, 127, 0, 0.15)',
                border: '1px solid rgba(206, 127, 0, 0.3)',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ fontSize: '16px' }}>💻</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#ce7f00' }}>LeetCode</span>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#ce7f00',
                    background: 'rgba(206, 127, 0, 0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {data.loading ? '...' : `${data.leetcode?.solvedToday || 0}`}
                  </span>
                </div>
                <div className="heatmap-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', height: '50px' }}>
                  {[...Array(30)].map((_, i) => {
                    const intensities = [
                      'rgba(206, 127, 0, 0)',
                      'rgba(206, 127, 0, 0.15)',
                      'rgba(206, 127, 0, 0.35)',
                      'rgba(206, 127, 0, 0.65)',
                      'rgba(206, 127, 0, 0.95)'
                    ];
                    const intensity = Math.floor(Math.random() * 5);
                    const isToday = i === 29;
                    return (
                      <div
                        key={i}
                        className="heatmap-cell"
                        style={{
                          background: intensities[intensity],
                          border: isToday ? '1px solid #8B5CF6' : 'none',
                          boxShadow: isToday ? '0 0 2px #ce7f00' : 'none'
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>

              {/* GitHub Mini Card */}
              <div style={{
                background: 'rgba(71, 226, 102, 0.15)',
                border: '1px solid rgba(71, 226, 102, 0.3)',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ fontSize: '16px' }}>🔵</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#47e266' }}>GitHub</span>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#47e266',
                    background: 'rgba(71, 226, 102, 0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {data.loading ? '...' : `${data.github?.commitsToday || 0}`}
                  </span>
                </div>
                <div className="heatmap-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', height: '50px' }}>
                  {[...Array(30)].map((_, i) => {
                    const intensities = [
                      'rgba(71, 226, 102, 0)',
                      'rgba(71, 226, 102, 0.15)',
                      'rgba(71, 226, 102, 0.35)',
                      'rgba(71, 226, 102, 0.65)',
                      'rgba(71, 226, 102, 0.95)'
                    ];
                    const intensity = Math.floor(Math.random() * 5);
                    return (
                      <div
                        key={i}
                        className="heatmap-cell"
                        style={{
                          background: intensities[intensity]
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                <div style={{
                  background: 'rgba(255, 180, 171, 0.15)',
                  border: '1px solid rgba(255, 180, 171, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '10px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase' }}>Streak</p>
                  <p style={{ fontSize: '16px', fontWeight: '900', color: '#e4e2e4' }}>🔥 {data.streak}</p>
                </div>
                <div style={{
                  background: 'rgba(71, 226, 102, 0.15)',
                  border: '1px solid rgba(71, 226, 102, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '10px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase' }}>Score</p>
                  <p style={{ fontSize: '16px', fontWeight: '900', color: '#aac7ff' }}>{Math.round(data.score)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Widget Footer */}
          <div style={{
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10px',
            color: '#c0c6d6'
          }}>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
