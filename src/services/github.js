import axios from 'axios';

export async function fetchGitHubData(username, token = null) {
  try {
    if (!username) {
      // Return mock data for demo
      return getMockGitHubData();
    }

    const headers = token ? { Authorization: `token ${token}` } : {};
    
    // Fetch user events
    const eventsResponse = await axios.get(
      `https://api.github.com/users/${username}/events`,
      { headers }
    );

    const events = eventsResponse.data;
    
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build contribution calendar for current month
    const contributionCalendar = {};
    
    events.forEach(event => {
      const eventDate = new Date(event.created_at);
      const dateStr = eventDate.toISOString().split('T')[0];
      
      if (event.type === 'PushEvent') {
        const commits = event.payload.commits?.length || 0;
        contributionCalendar[dateStr] = (contributionCalendar[dateStr] || 0) + commits;
      }
    });

    // Count today's commits
    const todayStr = today.toISOString().split('T')[0];
    const commitsToday = contributionCalendar[todayStr] || 0;
    
    // Count active repos
    const reposActive = new Set();
    events.forEach(event => {
      const eventDate = new Date(event.created_at);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate.getTime() === today.getTime() && event.type === 'PushEvent') {
        reposActive.add(event.repo.name);
      }
    });

    // Fetch user stats
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers }
    );

    return {
      commitsToday,
      reposActive: reposActive.size,
      totalRepos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      contributionCalendar
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    // Return mock data on error
    return getMockGitHubData();
  }
}

function getMockGitHubData() {
  // Generate mock contribution calendar for last 15 days
  const contributionCalendar = {};
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Mock some activity with random patterns
    let count = 0;
    if (i === 0) count = 3; // Today
    else if (i === 1) count = 5; // Yesterday
    else if (i === 2) count = 2; // 2 days ago
    else if (i === 4) count = 1; // 4 days ago
    else if (i === 6) count = 4; // 6 days ago
    else if (i === 8) count = 2; // 8 days ago
    else if (i === 12) count = 6; // 12 days ago
    
    contributionCalendar[dateStr] = count;
  }

  return {
    commitsToday: 3,
    reposActive: 2,
    totalRepos: 24,
    followers: 89,
    contributionCalendar
  };
}
