import axios from 'axios';

const LEETCODE_API = 'https://leetcode.com/graphql';
const API_TIMEOUT = 10000; // 10 seconds

export async function fetchLeetCodeData(username) {
  try {
    if (!username || typeof username !== 'string') {
      // Return mock data for demo
      return getMockLeetCodeData();
    }

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          submissionCalendar
          profile {
            ranking
          }
        }
        recentSubmissionList(username: $username, limit: 20) {
          title
          timestamp
          statusDisplay
        }
      }
    `;

    const response = await axios.post(LEETCODE_API, {
      query,
      variables: { username }
    }, { timeout: API_TIMEOUT });

    // Check for GraphQL errors
    if (response.data.errors) {
      console.error('LeetCode GraphQL error:', response.data.errors);
      return getMockLeetCodeData();
    }

    const data = response.data.data;
    if (!data || !data.matchedUser) {
      console.error('Invalid LeetCode response');
      return getMockLeetCodeData();
    }

    const submissions = data.recentSubmissionList || [];
    
    // Safely parse submission calendar
    let calendar = {};
    try {
      const calendarStr = data.matchedUser.submissionCalendar;
      calendar = typeof calendarStr === 'string' ? JSON.parse(calendarStr) : calendarStr || {};
    } catch (e) {
      console.error('Error parsing calendar:', e);
      calendar = {};
    }
    
    // Convert calendar to date-based object
    const contributionCalendar = {};
    Object.keys(calendar).forEach(timestamp => {
      try {
        const date = new Date(parseInt(timestamp) * 1000);
        const dateStr = date.toISOString().split('T')[0];
        contributionCalendar[dateStr] = calendar[timestamp];
      } catch (e) {
        console.error('Error processing calendar entry:', e);
      }
    });
    
    // Get today's timestamp
    const today = Math.floor(Date.now() / 1000);
    const todayStart = today - (today % 86400);
    
    // Count today's solved problems
    const solvedToday = submissions.filter(sub => {
      const subTime = parseInt(sub.timestamp);
      return subTime >= todayStart && sub.statusDisplay === 'Accepted';
    }).length;

    // Get total solved
    const stats = data.matchedUser.submitStats?.acSubmissionNum || [];
    const totalSolved = stats.reduce((sum, item) => sum + (item.count || 0), 0);

    // Mock monthly progress
    const monthlyGoal = 30;
    const monthlyProgress = Math.min((totalSolved % monthlyGoal) / monthlyGoal * 100, 100);

    // Generate today's tasks
    const todaysTasks = [
      { name: 'Two Sum', difficulty: 'Easy', completed: solvedToday > 0 },
      { name: 'Add Two Numbers', difficulty: 'Medium', completed: solvedToday > 1 },
      { name: 'Longest Substring', difficulty: 'Medium', completed: solvedToday > 2 }
    ];

    return {
      solvedToday,
      totalSolved,
      monthlyProgress,
      todaysTasks,
      ranking: data.matchedUser.profile?.ranking || 0,
      contributionCalendar
    };
  } catch (error) {
    console.error('LeetCode API error:', error.message);
    // Return mock data on error
    return getMockLeetCodeData();
  }
}

function getMockLeetCodeData() {
  // Generate mock contribution calendar for last 15 days
  const contributionCalendar = {};
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Mock some activity with random patterns
    let count = 0;
    if (i === 0) count = 2; // Today
    else if (i === 1) count = 1; // Yesterday
    else if (i === 3) count = 3; // 3 days ago
    else if (i === 7) count = 1; // A week ago
    else if (i === 10) count = 4; // 10 days ago
    
    contributionCalendar[dateStr] = count;
  }

  return {
    solvedToday: 2,
    totalSolved: 156,
    monthlyProgress: 67,
    todaysTasks: [
      { name: 'Two Sum', difficulty: 'Easy', completed: true },
      { name: 'Add Two Numbers', difficulty: 'Medium', completed: true },
      { name: 'Longest Substring', difficulty: 'Medium', completed: false }
    ],
    ranking: 45231,
    contributionCalendar
  };
}
