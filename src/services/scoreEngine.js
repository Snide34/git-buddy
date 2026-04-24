export function calculateDailyScore(leetcodeData, githubData) {
  if (!leetcodeData || !githubData) return 0;

  // LeetCode scoring (60% weight)
  const leetcodeScore = Math.min((leetcodeData.solvedToday / 3) * 60, 60);

  // GitHub scoring (40% weight)
  const githubScore = Math.min((githubData.commitsToday / 5) * 40, 40);

  return Math.round(leetcodeScore + githubScore);
}

export function calculateStreak(lastActive, currentScore) {
  const today = new Date().toDateString();
  
  if (!lastActive) {
    return currentScore > 0 ? 1 : 0;
  }

  const lastDate = new Date(lastActive);
  const todayDate = new Date(today);
  const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day, maintain streak
    return null; // Don't update
  } else if (diffDays === 1 && currentScore > 0) {
    // Next day with activity, increment
    return 'increment';
  } else {
    // Streak broken
    return currentScore > 0 ? 1 : 0;
  }
}
