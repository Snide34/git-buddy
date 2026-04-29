import React from 'react';

function ContributionGraph({ data, type = 'github' }) {
  // Generate last 14 days + today for compact view
  const generateDates = () => {
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

  const getIntensity = (dateStr) => {
    if (!data || !data[dateStr]) return 0;
    
    const count = data[dateStr];
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const dates = generateDates();

  return (
    <div className="compact-heatmap">
      {dates.map(({ date, isToday }) => (
        <div
          key={date}
          className={`heatmap-day ${type} intensity-${getIntensity(date)} ${
            isToday ? 'today-glow' : ''
          }`}
          title={`${date}: ${data?.[date] || 0} ${type === 'leetcode' ? 'problems' : 'commits'}`}
        >
          {isToday && <div className="today-pulse"></div>}
        </div>
      ))}
    </div>
  );
}

export default ContributionGraph;
