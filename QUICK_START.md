# ⚡ Quick Start Guide

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Start Development (30 sec)
```bash
npm run dev
```

The widget will appear in the **top-right corner** of your screen!

### Step 3: Configure (1 min)
1. Click the **⚙️ Settings** button
2. Enter your **LeetCode username**
3. Enter your **GitHub username**
4. (Optional) Add GitHub token for private repos
5. Click **Save**

Done! Your widget is now tracking your productivity 🎯

---

## 🎨 What You'll See

### First Launch (No Config)
- Empty widget with "Configure username" messages
- Settings modal opens automatically
- Clean, professional UI

### After Configuration
- **Animated score ring** showing your daily productivity (0-100)
- **Streak counter** with fire emoji 🔥
- **LeetCode card** with problems solved + difficulty breakdown
- **GitHub card** with commits + contribution heatmap
- **Smart task list** with AI suggestions

---

## 🔧 Common Setup Issues

### Widget Not Showing?
- Check Task Manager for "Electron" process
- Try restarting: `Ctrl+C` then `npm run dev` again
- Make sure port 5173 is not in use

### API Errors?
- Verify usernames are correct (case-sensitive)
- Check internet connection
- LeetCode username: Your profile URL username
- GitHub username: Your @username

### Slow Loading?
- First fetch takes 5-10 seconds
- Subsequent loads use cache (instant)
- Refresh manually with ↻ button

---

## 📦 Build for Production

### Create Installer
```bash
npm run build
```

This creates a Windows installer in `dist/` folder.

### Install & Use
1. Run the installer
2. Widget auto-starts with Windows
3. Find it in system tray
4. Always on top, never in the way

---

## ⚙️ Customization

### Change Refresh Interval
Edit `src/App.jsx` line 35:
```javascript
const interval = setInterval(fetchData, 30 * 60 * 1000); // 30 min
```

### Adjust Scoring Weights
Edit `src/services/scoreEngine.js`:
```javascript
const leetcodeScore = Math.min((leetcodeData.solvedToday / 3) * 60, 60);
const githubScore = Math.min((githubData.commitsToday / 5) * 40, 40);
```

### Add Custom Tasks
Edit `src/services/leetcode.js` line 40:
```javascript
const todaysTasks = [
  { name: 'Your Problem', difficulty: 'Easy', completed: false },
  // Add more...
];
```

### Change Window Position
Edit `electron/main.js` line 15:
```javascript
x: width - 420,  // Distance from right edge
y: 20,           // Distance from top
```

---

## 🎯 Daily Workflow

### Morning
1. Widget shows yesterday's streak
2. Check today's recommended tasks
3. Start with Easy problem

### During Day
- Widget updates automatically every 30 min
- Manual refresh anytime with ↻ button
- Watch your score increase as you work

### Evening
- Review daily score
- Check if streak continues
- Plan tomorrow's tasks

---

## 🔥 Pro Tips

### Maximize Your Score
- Solve 3 LeetCode problems = 60 points
- Make 5 GitHub commits = 40 points
- Total = 100 points (perfect day!)

### Maintain Streak
- Do at least 1 problem OR 1 commit daily
- Widget reminds you with streak counter
- Weekly goal: 7 days straight

### Use AI Suggestions
- Start with Easy when score is 0
- Move to Medium after 1 problem
- Challenge yourself with Hard after 2+

---

## 📱 Keyboard Shortcuts

- **Drag**: Click and hold anywhere on widget
- **Resize**: Drag from corners/edges
- **Settings**: Click ⚙️ button
- **Refresh**: Click ↻ button
- **Close**: Close button (minimizes to tray)

---

## 🐛 Troubleshooting

### Widget Disappeared?
- Check system tray (bottom-right)
- Click icon to restore
- Or restart app

### Data Not Updating?
1. Check internet connection
2. Verify usernames in settings
3. Try manual refresh
4. Check console for errors (F12)

### High Memory Usage?
- Normal: ~100MB
- If higher: Restart app
- Close DevTools if open

### Auto-Launch Not Working?
- Run app as administrator once
- Check Windows startup settings
- Reinstall if needed

---

## 📚 Learn More

- **Full Features**: See [FEATURES.md](FEATURES.md)
- **Design Details**: See [DESIGN_UPGRADE.md](DESIGN_UPGRADE.md)
- **Showcase Guide**: See [SHOWCASE.md](SHOWCASE.md)
- **Before/After**: See [BEFORE_AFTER.md](BEFORE_AFTER.md)

---

## 🤝 Get Help

### Issues?
- Check [GitHub Issues](https://github.com/yourusername/dev-widget/issues)
- Search existing issues first
- Provide error logs if reporting bug

### Questions?
- Read the [README.md](README.md)
- Check [FEATURES.md](FEATURES.md)
- Ask in Discussions

### Want to Contribute?
- See [CONTRIBUTING.md](CONTRIBUTING.md)
- Fork and submit PR
- All contributions welcome!

---

## 🎉 You're All Set!

Your premium productivity widget is ready to help you:
- ✅ Track daily coding progress
- ✅ Maintain consistency with streaks
- ✅ Stay motivated with AI suggestions
- ✅ Visualize your productivity journey

**Now go solve some problems and make some commits!** 🚀

---

Need help? Open an issue on GitHub!  
Love it? Give it a ⭐!
