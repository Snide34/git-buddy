# 🎯 DevPulse Pro - Desktop Productivity Widget

> A premium, floating desktop widget that tracks your LeetCode and GitHub productivity in real-time.

![Version](https://img.shields.io/badge/version-2.4.0-blue)
![Status](https://img.shields.io/badge/status-production%20ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

### 📊 Real-Time Tracking
- **LeetCode Integration**: Track problems solved, difficulty breakdown, contribution heatmap
- **GitHub Integration**: Track commits, last activity, contribution heatmap
- **Activity Heatmaps**: 7x5 grid showing 35 days of activity
- **Daily Metrics**: Streak counter and productivity score (0-100%)

### 🎨 Premium Design
- **Glassmorphism**: Modern frosted glass effect with backdrop blur
- **Dark Mode**: Optimized for dark environments
- **Compact Layout**: 450x800px floating widget
- **Always On Top**: Stays visible above other windows
- **Smooth Animations**: Polished transitions and hover effects

### 🛡️ Robust Features
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Offline Access**: Cached data for offline viewing
- **Auto-Refresh**: Updates every 30 minutes automatically
- **Mock Data**: Demo mode with sample data
- **Secure**: Local storage, no cloud transmission

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/Snide34/git-buddy.git
cd git-buddy

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

### First Time Setup
1. Launch the widget
2. Click settings (if available)
3. Enter your LeetCode username
4. Enter your GitHub username
5. (Optional) Add GitHub token for private repos
6. Save configuration

---

## 📦 What's Included

### Core Files
- `src/App.jsx` - Main widget component
- `electron/main.js` - Electron window configuration
- `electron/preload.js` - IPC bridge
- `src/services/` - API integration services

### Documentation
- `WIDGET_GUIDE.md` - Complete user guide
- `DESIGN_SYSTEM.md` - Design specifications
- `FINAL_SUMMARY.md` - Project overview
- `BUG_FIXES_REPORT.md` - All fixes detailed

---

## 🎮 Widget Controls

### Title Bar
- **🔴 Red Button**: Close widget
- **🟡 Yellow Button**: Minimize widget
- **🟢 Green Button**: Active indicator
- **↻ Button**: Refresh data manually

### Interactions
- **Drag**: Click title bar to move widget
- **Hover**: Cards highlight on hover
- **Click**: Heatmap cells show details

---

## 📊 Widget Layout

```
┌─────────────────────────────────┐
│ 🔴 🟡 🟢  DevPulse Pro      ↻  │  ← Title Bar
├─────────────────────────────────┤
│                                 │
│  💻 LeetCode          [2]       │  ← LeetCode Card
│  ┌─────────────────────────────┐│
│  │ [Heatmap Grid 7x5]          ││
│  └─────────────────────────────┘│
│                                 │
│  🔵 GitHub            [3]       │  ← GitHub Card
│  ┌─────────────────────────────┐│
│  │ [Heatmap Grid 7x5]          ││
│  └─────────────────────────────┘│
│                                 │
│  🔥 Streak: 5    📊 Score: 92%  │  ← Quick Stats
│                                 │
│  Today's Grind                  │  ← Tasks
│  ✓ Two Sum (Easy)               │
│  ○ Add Two Numbers (Medium)     │
│  ○ Validate Tree                │
│                                 │
│  Sprint                         │  ← Progress
│  Refactor Auth    75%           │
│  Add Tests        40%           │
│                                 │
├─────────────────────────────────┤
│ Last updated: 14:32:15  v2.4.0  │  ← Footer
└─────────────────────────────────┘
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#aac7ff` | Buttons, highlights |
| GitHub Green | `#47e266` | GitHub elements |
| LeetCode Orange | `#ce7f00` | LeetCode elements |
| Background | `#131315` | Main background |
| Surface | `#1f1f21` | Card backgrounds |
| Text | `#e4e2e4` | Primary text |

---

## 📈 Metrics Explained

### Daily Score
- **Range**: 0-100%
- **Calculation**: 
  - LeetCode: 60% weight (problems solved)
  - GitHub: 40% weight (commits made)
- **Updates**: Real-time as you code

### Active Streak
- **Definition**: Consecutive days with activity
- **Reset**: Breaks if no activity for a day
- **Display**: 🔥 emoji with day count

### Heatmap
- **Grid**: 7 columns × 5 rows (35 days)
- **Colors**: Intensity from dim to bright
- **Today**: Highlighted with purple border

---

## 🔧 Technical Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **CSS** - Styling with glassmorphism

### Desktop
- **Electron 29** - Desktop app framework
- **Electron Store** - Data persistence
- **Auto Launch** - Startup integration

### APIs
- **LeetCode GraphQL** - Problem tracking
- **GitHub REST API** - Commit tracking
- **Axios** - HTTP client with timeout

---

## 📁 Project Structure

```
buddy/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # IPC bridge
├── src/
│   ├── App.jsx          # Main widget component
│   ├── main.jsx         # React entry point
│   ├── index.css        # Global styles
│   ├── components/
│   │   ├── Widget.jsx
│   │   ├── ConfigModal.jsx
│   │   └── ...
│   └── services/
│       ├── leetcode.js
│       ├── github.js
│       └── scoreEngine.js
├── index.html
├── package.json
├── vite.config.js
└── Documentation files
```

---

## 🎯 Key Features

### ✅ Real-Time Integration
- LeetCode API integration with error handling
- GitHub API integration with rate limiting
- 10-second timeout protection
- Graceful fallback to mock data

### ✅ Smart Caching
- Offline access with cached data
- Automatic cache updates
- Persistent storage
- No cloud transmission

### ✅ Error Handling
- React Error Boundary
- Comprehensive try-catch blocks
- User-friendly error messages
- Automatic recovery

### ✅ Performance
- Optimized re-renders
- Efficient caching
- Smooth animations
- Minimal resource usage

---

## 🔐 Security & Privacy

- ✅ **Local Storage**: All data stored locally
- ✅ **No Tracking**: No analytics or telemetry
- ✅ **No Cloud**: No external data transmission
- ✅ **Open Source**: Full transparency
- ✅ **Secure**: Input validation and error handling

---

## 📚 Documentation

- **[WIDGET_GUIDE.md](WIDGET_GUIDE.md)** - Complete user guide
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Design specifications
- **[FINAL_SUMMARY.md](FINAL_SUMMARY.md)** - Project overview
- **[BUG_FIXES_REPORT.md](BUG_FIXES_REPORT.md)** - All fixes detailed
- **[DEEP_SCAN_RESULTS.md](DEEP_SCAN_RESULTS.md)** - Comprehensive analysis

---

## 🚀 Getting Started

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Run
```bash
npm start
```

---

## 🎓 Usage Tips

### Maximize Productivity
1. Keep widget visible on desktop
2. Check daily score regularly
3. Track your streak
4. Monitor progress trends

### Best Practices
1. Refresh before important meetings
2. Use as motivation tool
3. Share progress with team
4. Set daily goals

---

## 🐛 Troubleshooting

### Widget Not Showing
- Check if application is running
- Verify window is not minimized
- Check taskbar for widget window
- Restart application

### Data Not Updating
- Click refresh button
- Check internet connection
- Verify usernames are correct
- Check API status

---

## 🌟 Future Enhancements

### v2.5.0
- [ ] Custom themes
- [ ] Notification system
- [ ] Weekly reports

### v3.0.0
- [ ] Mobile app
- [ ] Cloud sync
- [ ] Team dashboard

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Total Commits | 15+ |
| Issues Fixed | 50 |
| Lines of Code | 2000+ |
| Components | 5 |
| Documentation | 6 files |
| Status | ✅ Production Ready |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🔗 Links

- **GitHub**: https://github.com/Snide34/git-buddy
- **LeetCode**: https://leetcode.com
- **GitHub**: https://github.com

---

## 👨‍💻 Author

Built with ❤️ for developers who track their productivity.

---

## 📞 Support

For issues, questions, or suggestions:
1. Check the documentation
2. Review the troubleshooting guide
3. Open an issue on GitHub

---

**Version**: 2.4.0  
**Last Updated**: April 30, 2026  
**Status**: ✅ Production Ready

---

*Track your productivity. Stay motivated. Keep coding.* 🚀
