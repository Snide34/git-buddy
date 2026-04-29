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
          background: radial-gradient(circle at top left, #1e293b, #0f172a, #020617);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #e4e2e4;
        }
        
        .glass-container {
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .glass-card-nested {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
          vertical-align: middle;
        }
        
        .github-glow {
          box-shadow: 0 0 8px #47e266;
        }
        
        .leetcode-glow {
          box-shadow: 0 0 8px #ce7f00;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          height: 128px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px;
          overflow: hidden;
        }
        
        .heatmap-cell {
          border-radius: 4px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .heatmap-cell:hover {
          transform: scale(1.1);
          z-index: 10;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '-96px',
          left: '-96px',
          width: '384px',
          height: '384px',
          background: 'rgba(170, 199, 255, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(120px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-96px',
          right: '-96px',
          width: '384px',
          height: '384px',
          background: 'rgba(255, 184, 104, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(120px)'
        }}></div>
      </div>

      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          width: '100%',
          maxWidth: '960px',
          height: '720px'
        }}>
          {/* LeetCode Card */}
          <div style={{
            background: 'rgba(19, 19, 21, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '20px', color: '#ce7f00' }}>💻</span>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  lineHeight: '24px',
                  color: '#e4e2e4'
                }}>LeetCode</h3>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: '9999px',
                background: 'rgba(206, 127, 0, 0.1)',
                border: '1px solid rgba(206, 127, 0, 0.3)',
                boxShadow: '0 0 8px #ce7f00'
              }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#ce7f00',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {data.loading ? '...' : `${data.leetcode?.solvedToday || 0} problems today`}
                </span>
              </div>
            </div>

            {/* Heatmap */}
            <div className="heatmap-grid">
              {[...Array(35)].map((_, i) => {
                const intensities = [
                  'rgba(206, 127, 0, 0)',
                  'rgba(206, 127, 0, 0.1)',
                  'rgba(206, 127, 0, 0.3)',
                  'rgba(206, 127, 0, 0.6)',
                  'rgba(206, 127, 0, 0.9)'
                ];
                const intensity = Math.floor(Math.random() * 5);
                const isToday = i === 34;
                return (
                  <div
                    key={i}
                    className="heatmap-cell"
                    style={{
                      background: intensities[intensity],
                      border: isToday ? '2px solid #8B5CF6' : 'none',
                      boxShadow: isToday ? '0 0 8px #ce7f00' : 'none'
                    }}
                  ></div>
                );
              })}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              flex: 1,
              paddingBottom: '8px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Easy</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#ce7f00' }}>124</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Med</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#e4e2e4' }}>56</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hard</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#ffb4ab' }}>12</p>
              </div>
            </div>
          </div>

          {/* GitHub Card */}
          <div style={{
            background: 'rgba(19, 19, 21, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '20px', color: '#47e266' }}>🔵</span>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  lineHeight: '24px',
                  color: '#e4e2e4'
                }}>GitHub</h3>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: '9999px',
                background: 'rgba(71, 226, 102, 0.1)',
                border: '1px solid rgba(71, 226, 102, 0.3)',
                boxShadow: '0 0 8px #47e266'
              }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#47e266',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {data.loading ? '...' : `${data.github?.commitsToday || 0} commits today`}
                </span>
              </div>
            </div>

            {/* Heatmap */}
            <div className="heatmap-grid">
              {[...Array(35)].map((_, i) => {
                const intensities = [
                  'rgba(71, 226, 102, 0)',
                  'rgba(71, 226, 102, 0.1)',
                  'rgba(71, 226, 102, 0.3)',
                  'rgba(71, 226, 102, 0.6)',
                  'rgba(71, 226, 102, 0.8)'
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

            <div style={{ marginTop: 'auto', paddingTop: '8px', space: '8px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#c0c6d6' }}>Last commit</span>
                <span style={{ color: '#47e266' }}>22h ago</span>
              </div>
              <div style={{
                width: '100%',
                height: '4px',
                background: 'rgba(53, 52, 55, 1)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: '85%',
                  background: '#47e266',
                  borderRadius: '9999px',
                  boxShadow: '0 0 8px rgba(71, 226, 102, 0.5)'
                }}></div>
              </div>
            </div>
          </div>

          {/* Today's Grind */}
          <div style={{
            background: 'rgba(19, 19, 21, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '20px', color: '#aac7ff' }}>✓</span>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '24px',
                color: '#e4e2e4'
              }}>Today's Grind</h3>
            </div>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }} className="hide-scrollbar">
              {[
                { name: 'Two Sum (Easy)', category: 'Algorithms • LeetCode', completed: true },
                { name: 'Add Two Numbers (Medium)', category: 'Linked Lists • LeetCode', completed: false },
                { name: 'Validate Binary Tree', category: 'Trees • LeetCode', completed: false }
              ].map((task, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#aac7ff'
                    }}
                    readOnly
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: task.completed ? '#c0c6d6' : '#e4e2e4',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}>
                      {task.name}
                    </p>
                    <p style={{
                      fontSize: '10px',
                      color: 'rgba(192, 198, 214, 0.6)',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {task.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Sprint */}
          <div style={{
            background: 'rgba(19, 19, 21, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '20px', color: '#aac7ff' }}>🚀</span>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '24px',
                color: '#e4e2e4'
              }}>Current Sprint</h3>
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                { name: 'Refactor Auth', progress: 75 },
                { name: 'Add Tests', progress: 30 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#e4e2e4'
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: '#aac7ff',
                      fontFamily: 'Space Grotesk'
                    }}>
                      {item.progress}%
                    </p>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(53, 52, 55, 1)',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${item.progress}%`,
                      background: '#aac7ff',
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              ))}

              <div style={{
                padding: '12px',
                background: 'rgba(170, 199, 255, 0.1)',
                border: '1px solid rgba(170, 199, 255, 0.2)',
                borderRadius: '8px',
                marginTop: 'auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '16px', color: '#aac7ff' }}>ℹ️</span>
                  <p style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#aac7ff'
                  }}>
                    Deadline Approaching
                  </p>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#d6e3ff',
                  lineHeight: '1.4'
                }}>
                  Sprint v2.4.0 ends in <span style={{ fontWeight: '700' }}>2 days</span>. Keep pushing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        zIndex: 20,
        maxWidth: '960px',
        width: 'calc(100% - 64px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            height: '40px',
            width: '40px',
            borderRadius: '9999px',
            background: 'rgba(255, 180, 171, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 180, 171, 0.3)',
            boxShadow: '0 0 12px rgba(255, 180, 171, 0.3)'
          }}>
            <span style={{ fontSize: '20px' }}>🔥</span>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Streak</p>
            <p style={{ fontSize: '18px', fontWeight: '900', color: '#e4e2e4', lineHeight: '1' }}>{data.streak} Days</p>
          </div>
        </div>

        <div style={{ height: '40px', width: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            height: '40px',
            width: '40px',
            borderRadius: '9999px',
            background: 'rgba(71, 226, 102, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(71, 226, 102, 0.3)',
            boxShadow: '0 0 12px rgba(71, 226, 102, 0.3)'
          }}>
            <span style={{ fontSize: '20px' }}>📊</span>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#c0c6d6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Daily Score</p>
            <p style={{ fontSize: '18px', fontWeight: '900', color: '#e4e2e4', lineHeight: '1' }}>{Math.round(data.score)}%</p>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleRefresh}
            disabled={data.loading}
            style={{
              padding: '8px 16px',
              background: '#aac7ff',
              color: '#003064',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: data.loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 16px rgba(170, 199, 255, 0.2)',
              transition: 'all 0.2s',
              opacity: data.loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !data.loading && (e.target.style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => !data.loading && (e.target.style.filter = 'brightness(1)')}
          >
            {data.loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
