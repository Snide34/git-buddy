import React from 'react';
import ProgressRing from './ProgressRing';
import TaskList from './TaskList';

function Widget({ data, onSettings, onRefresh }) {
  const { leetcode, github, score, streak, loading } = data;

  return (
    <div className="widget-container">
      {/* Header */}
      <div className="widget-header">
        <div className="drag-handle">
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={onRefresh} className="icon-btn" title="Refresh">
            <RefreshIcon />
          </button>
          <button onClick={onSettings} className="icon-btn" title="Settings">
            <SettingsIcon />
          </button>
        </div>
      </div>

      {/* Score Section */}
      <div className="score-section">
        <ProgressRing score={score} leetcode={leetcode} github={github} />
        <div className="streak">
          <span className="fire">🔥</span>
          <div className="streak-content">
            <span className="streak-count">{streak} day streak</span>
            <div className="streak-progress">
              <div className="streak-bar">
                <div 
                  className="streak-bar-fill" 
                  style={{ width: `${Math.min((streak / 7) * 100, 100)}%` }}
                />
              </div>
              <span className="streak-label">Weekly Goal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card leetcode">
          <div className="stat-header">
            <div className="stat-header-left">
              <span className="stat-icon">💻</span>
              <span className="stat-title">LeetCode</span>
            </div>
            {leetcode && leetcode.solvedToday > 0 && (
              <span className="stat-badge">Active</span>
            )}
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : leetcode ? (
            <>
              <div className="stat-value">{leetcode.solvedToday || 0}</div>
              <div className="stat-label">solved today</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill leetcode-fill"
                  style={{ width: `${leetcode.monthlyProgress || 0}%` }}
                />
              </div>
              <div className="stat-subtext">
                <span>{leetcode.totalSolved || 0} total</span>
                <span>#{leetcode.ranking || 'N/A'}</span>
              </div>
              <div className="difficulty-breakdown">
                <div className="difficulty-item">
                  <div className="difficulty-bar">
                    <div className="difficulty-bar-fill easy" style={{ width: '60%' }} />
                  </div>
                  <div className="difficulty-label">Easy</div>
                </div>
                <div className="difficulty-item">
                  <div className="difficulty-bar">
                    <div className="difficulty-bar-fill medium" style={{ width: '40%' }} />
                  </div>
                  <div className="difficulty-label">Med</div>
                </div>
                <div className="difficulty-item">
                  <div className="difficulty-bar">
                    <div className="difficulty-bar-fill hard" style={{ width: '20%' }} />
                  </div>
                  <div className="difficulty-label">Hard</div>
                </div>
              </div>
            </>
          ) : (
            <div className="stat-error">Configure username in settings</div>
          )}
        </div>

        <div className="stat-card github">
          <div className="stat-header">
            <div className="stat-header-left">
              <span className="stat-icon">🔵</span>
              <span className="stat-title">GitHub</span>
            </div>
            {github && github.commitsToday > 0 && (
              <span className="stat-badge">Active</span>
            )}
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : github ? (
            <>
              <div className="stat-value">{github.commitsToday || 0}</div>
              <div className="stat-label">commits today</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill github-fill"
                  style={{ width: `${Math.min((github.commitsToday / 5) * 100, 100)}%` }}
                />
              </div>
              <div className="stat-subtext">
                <span>{github.reposActive || 0} repos</span>
                <span>{github.totalRepos || 0} total</span>
              </div>
              <div className="contribution-heatmap">
                {[...Array(14)].map((_, i) => {
                  const level = Math.floor(Math.random() * 5);
                  return <div key={i} className={`contribution-day level-${level}`} />;
                })}
              </div>
            </>
          ) : (
            <div className="stat-error">Configure username in settings</div>
          )}
        </div>
      </div>

      {/* Today's Tasks */}
      <TaskList leetcode={leetcode} />
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
    </svg>
  );
}

export default Widget;
