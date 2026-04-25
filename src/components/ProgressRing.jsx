import React from 'react';

function ProgressRing({ score, leetcode, github }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const problemsToday = leetcode?.solvedToday || 0;
  const commitsToday = github?.commitsToday || 0;

  return (
    <div className="progress-ring">
      <svg width="180" height="180">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="14"
        />
        
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      
      <div className="score-text">
        <div className="score-number">{Math.round(score)}</div>
        <div className="score-label">daily score</div>
        {(problemsToday > 0 || commitsToday > 0) && (
          <div className="score-subtext">
            {problemsToday > 0 && (
              <span>
                <span className="highlight">+{problemsToday}</span> problems
              </span>
            )}
            {commitsToday > 0 && (
              <span>
                <span className="highlight">+{commitsToday}</span> commits
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressRing;
