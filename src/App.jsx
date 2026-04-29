import React from 'react';

function App() {
  return (
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
        gap: '20px'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28CA42' }}></div>
          </div>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Dev-Hub Widget</h2>
          <div style={{ width: '60px' }}></div>
        </div>

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
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>2</div>
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>3</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1 }}>
          {/* Today's Grind */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '16px'
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
            padding: '16px'
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
            <span style={{ fontSize: '14px', fontWeight: '600' }}>5 day streak</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Daily Score</div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '800',
              background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>85%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
