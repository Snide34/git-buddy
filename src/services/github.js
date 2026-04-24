import axios from 'axios';

export async function fetchGitHubData(username, token = null) {
  try {
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

    // Count today's commits
    let commitsToday = 0;
    const reposActive = new Set();

    events.forEach(event => {
      const eventDate = new Date(event.created_at);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === today.getTime()) {
        if (event.type === 'PushEvent') {
          commitsToday += event.payload.commits?.length || 0;
          reposActive.add(event.repo.name);
        }
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
      followers: userResponse.data.followers
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    throw error;
  }
}
