import React from 'react';
import { Terminal, Github, CheckCircle2, Circle, Zap, Settings, RefreshCw } from 'lucide-react';
import ContributionGraph from './ContributionGraph';

function Widget({ data, onSettings, onRefresh }) {
  const { leetcode, github, score, streak, loading } = data;

  console.log('Widget rendering with data:', data);

  // Generate current month dates for heatmap (last 14 days + today)
  const generateHeatmapDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 14; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push({
        date: date.toISOString().split('T')[0],
        isToday: i === 0
      });
    }
    return dates;
  };

  const heatmapDates = generateHeatmapDates();

  const getIntensity = (dateStr, type) => {
    const calendar = type === 'leetcode' ? leetcode?.contributionCalendar : github?.contributionCalendar;
    if (!calendar || !calendar[dateStr]) return 0;
    
    const count = calendar[dateStr];
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  console.log('Widget about to render JSX');

  return (
    <>
      {/* Breathing Mesh Background */}
      <div className="mesh-background"></div>
      
      <div className="dev-hub-widget">
        <div className="glass-container">
          {/* macOS Header */}
          <div className="macos-header">
            <div className="traffic-lights">
              <div className="traffic-light red" onClick={() => window.electron?.closeWindow()}></div>
              <div className="traffic-light yellow" onClick={() => window.electron?.minimizeWindow()}></div>
              <div className="traffic-light green"></div>
            </div>
            
            <div className="header-title">Dev-Hub Widget</div>
            
            <div className="header-actions">
              <button className="glass-btn" onClick={onRefresh} disabled={loading}>
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
              <button className="glass-btn" onClick={onSettings}>
                <Settings size={16} />
              </button>
            </div>
          </div>

          {/* Activity Section */}
          <div className="activity-section">
            {/* LeetCode Card */}
            <div className="activity-card leetcode-card">
              <div className="card-header">
                <Terminal size={20} className="card-icon" />
                <div className="card-title">LeetCode</div>
                <div className="today-count">
                  {loading ? (
                    <div className="loading-shimmer" style={{ width: '24px', height: '20px', borderRadius: '4px' }}></div>
                  ) : (
                    leetcode?.solvedToday || 0
                  )}
                </div>
              </div>
              
              {/* Compact Heatmap */}
              <div className="compact-heatmap">
                {heatmapDates.map(({ date, isToday }) => (
                  <div
                    key={date}
                    className={`heatmap-day leetcode intensity-${loading ? 0 : getIntensity(date, 'leetcode')} ${
                      isToday ? 'today-glow' : ''
                    } ${loading ? 'loading-shimmer' : ''}`}
                    title={`${date}: ${leetcode?.contributionCalendar?.[date] || 0} problems`}
                  >
                    {isToday && <div className="today-pulse"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Card */}
            <div className="activity-card github-card">
              <div className="card-header">
                <Github size={20} className="card-icon" />
                <div className="card-title">GitHub</div>
                <div className="today-count">
                  {loading ? (
                    <div className="loading-shimmer" style={{ width: '24px', height: '20px', borderRadius: '4px' }}></div>
                  ) : (
                    github?.commitsToday || 0
                  )}
                </div>
              </div>
              
              {/* Compact Heatmap */}
              <div className="compact-heatmap">
                {heatmapDates.map(({ date, isToday }) => (
                  <div
                    key={date}
                    className={`heatmap-day github intensity-${loading ? 0 : getIntensity(date, 'github')} ${
                      isToday ? 'today-glow' : ''
                    } ${loading ? 'loading-shimmer' : ''}`}
                    title={`${date}: ${github?.contributionCalendar?.[date] || 0} commits`}
                  >
                    {isToday && <div className="today-pulse"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dev-Pulse Todo Section */}
          <div className="dev-pulse-section">
            {/* Today's Grind */}
            <div className="todo-card">
              <div className="todo-header">
                <Zap size={16} />
                <div className="todo-title">Today's Grind</div>
              </div>
              
              <div className="todo-list">
                {(leetcode?.todaysTasks || [
                  { name: 'Two Sum', difficulty: 'Easy', completed: (leetcode?.solvedToday || 0) > 0 },
                  { name: 'Add Two Numbers', difficulty: 'Medium', completed: (leetcode?.solvedToday || 0) > 1 },
                  { name: 'Longest Substring', difficulty: 'Medium', completed: (leetcode?.solvedToday || 0) > 2 }
                ]).slice(0, 3).map((task, index) => (
                  <div key={index} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                    {task.completed ? (
                      <CheckCircle2 size={16} className="todo-icon completed" />
                    ) : (
                      <Circle size={16} className="todo-icon" />
                    )}
                    <div className="todo-text">
                      {task.name} <span style={{ opacity: 0.6 }}>({task.difficulty})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Sprint */}
            <div className="todo-card">
              <div className="todo-header">
                <Github size={16} />
                <div className="todo-title">Current Sprint</div>
              </div>
              
              <div className="sprint-item">
                <div className="sprint-task">
                  <div className="task-name">Refactor Auth Middleware</div>
                  <div className="task-progress">75%</div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="sprint-item">
                <div className="sprint-task">
                  <div className="task-name">Add Unit Tests</div>
                  <div className="task-progress">40%</div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div className="sprint-item">
                <div className="sprint-task">
                  <div className="task-name">Update Documentation</div>
                  <div className="task-progress">20%</div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Footer */}
          <div className="streak-footer">
            <div className="streak-info">
              <div className="streak-emoji">🔥</div>
              <div className="streak-text">{streak || 0} day streak</div>
            </div>
            
            <div className="daily-score">
              <div className="score-label">Daily Score</div>
              <div className="score-value">
                {loading ? (
                  <div className="loading-shimmer" style={{ width: '40px', height: '24px', borderRadius: '4px' }}></div>
                ) : (
                  `${Math.round(score || 0)}%`
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Widget;