import React from 'react';

function TaskList({ leetcode }) {
  const tasks = leetcode?.todaysTasks || [];
  const completedCount = tasks.filter(t => t.completed).length;

  const getAISuggestion = () => {
    if (completedCount === 0) {
      return "Start with an Easy problem to build momentum 🚀";
    } else if (completedCount === 1) {
      return "Great start! Try a Medium problem next 💪";
    } else if (completedCount >= 2) {
      return "You're on fire! Challenge yourself with a Hard problem 🔥";
    }
    return "Keep the streak going! 🎯";
  };

  return (
    <div className="task-section">
      <div className="task-header">
        <span className="task-title">Today's Focus</span>
        <span className="task-count">{completedCount}/{tasks.length}</span>
      </div>
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <span>🎯</span>
            <p>Configure your LeetCode username<br/>to see personalized tasks</p>
          </div>
        ) : (
          <>
            {tasks.map((task, index) => (
              <div key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-checkbox">
                  {task.completed ? '✓' : '○'}
                </div>
                <div className="task-content">
                  <div className="task-name">{task.name}</div>
                  <div className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                    {task.difficulty}
                  </div>
                </div>
              </div>
            ))}
            
            {tasks.length > 0 && (
              <div className="ai-suggestion">
                <span className="ai-suggestion-icon">✨</span>
                <div className="ai-suggestion-text">{getAISuggestion()}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;
