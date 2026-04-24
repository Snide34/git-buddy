import axios from 'axios';

const LEETCODE_API = 'https://leetcode.com/graphql';

export async function fetchLeetCodeData(username) {
  try {
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
    });

    const data = response.data.data;
    const submissions = data.recentSubmissionList || [];
    const calendar = JSON.parse(data.matchedUser.submissionCalendar || '{}');
    
    // Get today's timestamp
    const today = Math.floor(Date.now() / 1000);
    const todayStart = today - (today % 86400);
    
    // Count today's solved problems
    const solvedToday = submissions.filter(sub => {
      const subTime = parseInt(sub.timestamp);
      return subTime >= todayStart && sub.statusDisplay === 'Accepted';
    }).length;

    // Get total solved
    const stats = data.matchedUser.submitStats.acSubmissionNum;
    const totalSolved = stats.reduce((sum, item) => sum + item.count, 0);

    // Mock monthly progress (you can customize this)
    const monthlyGoal = 30;
    const monthlyProgress = Math.min((totalSolved % monthlyGoal) / monthlyGoal * 100, 100);

    // Generate today's tasks (mock data - customize based on your monthly plan)
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
      ranking: data.matchedUser.profile.ranking
    };
  } catch (error) {
    console.error('LeetCode API error:', error);
    throw error;
  }
}
