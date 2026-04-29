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
        // Set up refresh interval (30 minutes)
        const interval = setInterval(fetchData, 30 * 60 * 1000);
        return () => clearInterval(interval);
      } else {
        // Load mock data if no config
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

      // Get streak from cache
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

      // Cache the data
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
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        color: 'white'
      }}>
        {/* Glassmorphism Widget */}
        <div style={{
          width: '480px',
          height: '600px',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'hidden'
        }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57', cursor: 'pointer' }} onClick={() => window.electron?.closeWindow()}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E', cursor: 'pointer' }} onClick={() => window.electron?.minimizeWindow()}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28CA42' }}></div>
            </div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Dev-Hub Widget</h2>
            <button onClick={handleRefresh} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '12px'
            }} disabled={data.loading}>
              {data.loading ? '⟳' : '↻'}
            </button>
          </div>

          {/* Error Display */}
          {data.error && (
            <div style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '12px',
              color: '#FF6B6B'
            }}>
              ⚠️ {data.error}
            </div>
          )}

          {/* Activity Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* LeetCode */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>💻</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#FFA116' }}>LeetCode</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {data.loading ? '...' : (data.leetcode?.solvedToday || 0)}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>problems today</div>
              
              {/* Mini heatmap */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '2px', 
                marginTop: '12px' 
              }}>
                {[0,1,0,3,0,1,2].map((intensity, i) => (
                  <div key={i} style={{
                    aspectRatio: '1',
                    borderRadius: '2px',
                    background: intensity === 0 ? 'rgba(255,255,255,0.1)' : 
                               intensity === 1 ? 'rgba(255,161,22,0.3)' :
                               intensity === 2 ? 'rgba(255,161,22,0.6)' : 'rgba(255,161,22,1)',
                    border: i === 6 ? '2px solid #8B5CF6' : 'none'
                  }}></div>
                ))}
              </div>
            </div>

            {/* GitHub */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔵</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#2EA44F' }}>GitHub</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {data.loading ? '...' : (data.github?.commitsToday || 0)}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>commits today</div>
              
              {/* Mini heatmap */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '2px', 
                marginTop: '12px' 
              }}>
                {[2,5,2,0,1,4,3].map((intensity, i) => (
                  <div key={i} style={{
                    aspectRatio: '1',
                    borderRadius: '2px',
                    background: intensity === 0 ? 'rgba(255,255,255,0.1)' : 
                               intensity <= 2 ? 'rgba(46,164,79,0.3)' :
                               intensity <= 4 ? 'rgba(46,164,79,0.6)' : 'rgba(46,164,79,1)',
                    border: i === 6 ? '2px solid #8B5CF6' : 'none'
                  }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Todo Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1, minHeight: 0 }}>
            {/* Today's Grind */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px',
              overflow: 'auto'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚡ Today's Grind
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#4ADE80' }}>✓</span> Two Sum (Easy)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#4ADE80' }}>✓</span> Add Two Numbers (Medium)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.6 }}>
                  <span>○</span> Longest Substring (Medium)
                </div>
              </div>
            </div>

            {/* Current Sprint */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px',
              overflow: 'auto'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔵 Current Sprint
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span>Refactor Auth</span><span style={{ color: '#4ADE80' }}>75%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #4ADE80, #22C55E)', borderRadius: '2px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span>Add Tests</span><span style={{ color: '#4ADE80' }}>40%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg, #4ADE80, #22C55E)', borderRadius: '2px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🔥</span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{data.streak} day streak</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Daily Score</div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#8B5CF6'
              }}>{Math.round(data.score)}%</div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
