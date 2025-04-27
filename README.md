# Dev Productivity Widget 🚀

A beautiful desktop widget for Windows that tracks your daily coding productivity across LeetCode and GitHub.

## Features ✨

### 🎯 Core Features
- **Daily Productivity Score (0-100)**: Gamified scoring system combining LeetCode (60%) and GitHub (40%) activity
- **Animated Progress Ring**: Beautiful gradient ring with glow effects and live activity updates
- **Streak Tracking**: Maintain your coding streak with animated fire emoji and weekly progress bar
- **Smart Task List**: AI-powered suggestions based on your progress
- **GitHub Contribution Heatmap**: 14-day visualization of your commit activity
- **Difficulty Breakdown**: Visual representation of Easy/Medium/Hard problem distribution
- **Auto-Launch**: Starts automatically when Windows boots
- **Always On Top**: Floating widget that stays visible while you work
- **Auto-Refresh**: Updates every 30 minutes with offline fallback
- **Premium Glassmorphism UI**: Modern, minimal design with noise texture and depth

### 🎨 Design Highlights
- **Interactive Micro-Animations**: Hover effects, shimmer, glow pulse, floating elements
- **Data Storytelling**: Contextual AI suggestions like "You're on fire! Challenge yourself with a Hard problem 🔥"
- **Professional Error States**: Helpful guidance instead of generic "No data" messages
- **Color-Coded Badges**: Active status indicators, difficulty levels, and progress states
- **Smooth Transitions**: Cubic-bezier easing for natural, premium feel

## Installation 📦

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Run in development mode**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

This will create an installer in the `dist` folder.

## Configuration ⚙️

On first launch, you'll be prompted to enter:

1. **LeetCode Username**: Your LeetCode profile username
2. **GitHub Username**: Your GitHub username
3. **GitHub Token** (optional): Personal access token for private repos and higher rate limits
   - Create one at: https://github.com/settings/tokens
   - Only needs `repo` scope
4. **Launch at Startup**: Enable/disable auto-launch

## How It Works 🔧

### Daily Score Calculation
- **LeetCode (60% weight)**: Up to 3 problems per day = 60 points
- **GitHub (40% weight)**: Up to 5 commits per day = 40 points
- **Total**: 0-100 daily productivity score

### Streak System
- Increments when you have activity (score > 0) on consecutive days
- Resets if you miss a day
- Cached locally to persist across app restarts

### Data Refresh
- Automatically refreshes every 30 minutes
- Manual refresh available via refresh button
- Offline fallback using cached data

## Tech Stack 💻

- **Frontend**: React + Vite
- **Desktop**: Electron
- **APIs**: LeetCode GraphQL, GitHub REST API
- **Storage**: electron-store (local persistence)
- **Auto-Launch**: auto-launch package

## Project Structure 📁

```
dev-productivity-widget/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # IPC bridge
├── src/
│   ├── components/
│   │   ├── Widget.jsx          # Main widget UI
│   │   ├── ProgressRing.jsx    # Circular progress indicator
│   │   ├── TaskList.jsx        # Today's tasks display
│   │   └── ConfigModal.jsx     # Settings modal
│   ├── services/
│   │   ├── leetcode.js         # LeetCode API integration
│   │   ├── github.js           # GitHub API integration
│   │   └── scoreEngine.js      # Score calculation logic
│   ├── App.jsx          # Root component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## Customization 🎨

### Monthly Question Plan
Edit `src/services/leetcode.js` to customize your monthly question list:

```javascript
const todaysTasks = [
  { name: 'Two Sum', difficulty: 'Easy', completed: false },
  { name: 'Add Two Numbers', difficulty: 'Medium', completed: false },
  // Add your questions here
];
```

### Scoring Weights
Modify `src/services/scoreEngine.js` to adjust scoring:

```javascript
const leetcodeScore = Math.min((leetcodeData.solvedToday / 3) * 60, 60);
const githubScore = Math.min((githubData.commitsToday / 5) * 40, 40);
```

### Refresh Interval
Change in `src/App.jsx`:

```javascript
const interval = setInterval(fetchData, 30 * 60 * 1000); // 30 minutes
```

## Troubleshooting 🔧

### Widget not showing
- Check if the app is running in Task Manager
- Try restarting the app
- Ensure display scaling is set correctly

### API errors
- Verify usernames are correct
- Check internet connection
- For GitHub: ensure token has correct permissions
- LeetCode API may have rate limits

### Auto-launch not working
- Run the app as administrator once
- Check Windows startup settings
- Reinstall the app

## Future Enhancements 🚀

- [ ] Custom monthly question planner UI
- [ ] Multiple coding platform support (Codeforces, HackerRank)
- [ ] Detailed analytics dashboard
- [ ] Export progress reports
- [ ] Team leaderboards
- [ ] Notification system for streak reminders

## License 📄

MIT License - feel free to use this for your own productivity tracking!

## Contributing 🤝

Pull requests welcome! Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Add more platform integrations

---

Built with ❤️ for developers who want to track their coding journey
