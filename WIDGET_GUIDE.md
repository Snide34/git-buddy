# DevPulse Pro Widget - User Guide

## 🎯 Overview

DevPulse Pro is a compact, floating desktop widget that tracks your LeetCode and GitHub productivity in real-time. It sits in the bottom-right corner of your screen and provides instant access to your daily metrics.

---

## 📦 Widget Specifications

### Dimensions
- **Width**: 450px
- **Height**: 800px (expandable)
- **Position**: Bottom-right corner of screen
- **Always On Top**: Yes
- **Frameless**: Yes (native widget appearance)

### Visual Design
- **Background**: Transparent with glassmorphism effect
- **Blur**: 20px backdrop filter
- **Border**: Subtle white border (15% opacity)
- **Shadow**: Soft drop shadow with glow effect
- **Theme**: Dark mode optimized

---

## 🎨 Widget Components

### 1. Title Bar (macOS Style)
- **Traffic Lights**: Red (close), Yellow (minimize), Green (active)
- **Title**: "DevPulse Pro"
- **Refresh Button**: Manual data refresh
- **Draggable**: Click and drag to move widget

### 2. LeetCode Card
- **Icon**: 💻
- **Display**: Problems solved today
- **Heatmap**: 7x5 grid showing activity (last 35 days)
- **Color**: Orange (#ce7f00)
- **Glow**: Active day highlighted with purple border

### 3. GitHub Card
- **Icon**: 🔵
- **Display**: Commits today
- **Heatmap**: 7x5 grid showing activity (last 35 days)
- **Color**: Green (#47e266)
- **Progress**: Last commit timestamp with progress bar

### 4. Quick Stats
- **Streak**: 🔥 Active consecutive days
- **Score**: 📊 Daily productivity percentage (0-100%)

### 5. Today's Grind
- **Title**: "Today's Grind"
- **Content**: LeetCode problem checklist
- **Status**: Completed (✓) or Pending (○)
- **Items**: Up to 3 problems

### 6. Sprint Progress
- **Title**: "Sprint"
- **Content**: Current project tasks
- **Progress Bars**: Visual completion percentage
- **Items**: Up to 2 active tasks

### 7. Footer
- **Last Updated**: Timestamp of last data refresh
- **Version**: Current widget version (v2.4.0)

---

## 🎮 Controls

### Title Bar Buttons

| Button | Action | Shortcut |
|--------|--------|----------|
| 🔴 Red | Close widget | Click |
| 🟡 Yellow | Minimize widget | Click |
| 🟢 Green | Active indicator | - |
| ↻ Refresh | Refresh data | Click |

### Interactions

- **Drag**: Click title bar and drag to move widget
- **Hover**: Cards highlight on hover
- **Click**: Heatmap cells show tooltip on hover
- **Minimize**: Yellow button collapses widget content

---

## 📊 Data Display

### LeetCode Section
```
💻 LeetCode
├─ Today's Count: X problems
├─ Heatmap: 7x5 grid (35 days)
├─ Difficulty Breakdown:
│  ├─ Easy: 124
│  ├─ Medium: 56
│  └─ Hard: 12
└─ Last Updated: [timestamp]
```

### GitHub Section
```
🔵 GitHub
├─ Today's Count: X commits
├─ Heatmap: 7x5 grid (35 days)
├─ Last Commit: [time ago]
└─ Progress: [percentage]
```

### Metrics
```
🔥 Streak: X days
📊 Score: X%
```

---

## ⚙️ Configuration

### First Time Setup

1. **Open Settings**: Click the settings icon (if available)
2. **Enter Usernames**:
   - LeetCode username
   - GitHub username
3. **Optional**: Add GitHub token for private repos
4. **Save**: Configuration is stored locally

### Auto-Launch

- Widget automatically launches on system startup
- Can be disabled in settings
- Runs in background with minimal resource usage

---

## 🔄 Data Refresh

### Automatic Refresh
- **Interval**: Every 30 minutes
- **Background**: Runs automatically
- **No Action Required**: Data updates silently

### Manual Refresh
- **Button**: Click ↻ button in title bar
- **Feedback**: Button shows loading state
- **Duration**: Usually 2-5 seconds

---

## 💾 Data Storage

### Local Storage
- Configuration saved locally
- No cloud sync required
- Data persists between sessions

### Cache System
- Last data cached for offline access
- Automatic cache updates
- Fallback to mock data if API unavailable

### Privacy
- No data sent to external servers
- All processing local
- Credentials stored securely

---

## 🎯 Features

### Real-Time Tracking
- ✅ LeetCode problem tracking
- ✅ GitHub commit tracking
- ✅ Activity heatmaps
- ✅ Streak counter
- ✅ Daily score calculation

### Smart Features
- ✅ Auto-refresh every 30 minutes
- ✅ Offline access with caching
- ✅ Error handling with fallbacks
- ✅ Mock data for demo mode
- ✅ Minimize/expand functionality

### Design Features
- ✅ Glassmorphism effects
- ✅ Smooth animations
- ✅ Dark mode optimized
- ✅ Always-on-top window
- ✅ Draggable interface

---

## 🚀 Getting Started

### Installation
```bash
npm install
npm run build
```

### Development
```bash
npm run dev
```

### Running
- Widget launches automatically on startup
- Or manually run the application
- Appears in bottom-right corner

---

## 🔧 Troubleshooting

### Widget Not Showing
1. Check if application is running
2. Verify window is not minimized
3. Check taskbar for widget window
4. Restart application

### Data Not Updating
1. Click refresh button
2. Check internet connection
3. Verify usernames are correct
4. Check API status

### Performance Issues
1. Close other applications
2. Restart widget
3. Clear cache (if available)
4. Check system resources

---

## 📱 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Refresh data |
| `Ctrl+M` | Minimize widget |
| `Ctrl+Q` | Close widget |

---

## 🎨 Customization

### Future Options
- [ ] Custom themes
- [ ] Adjustable size
- [ ] Custom colors
- [ ] Layout options
- [ ] Notification settings

---

## 📈 Metrics Explained

### Daily Score
- **Calculation**: Combined LeetCode + GitHub activity
- **Range**: 0-100%
- **Formula**: 
  - LeetCode: 60% weight
  - GitHub: 40% weight

### Active Streak
- **Definition**: Consecutive days with activity
- **Reset**: Breaks if no activity for a day
- **Display**: 🔥 emoji with day count

### Heatmap Colors
- **Intensity 0**: No activity (dim)
- **Intensity 1**: Low activity (light)
- **Intensity 2**: Medium activity (medium)
- **Intensity 3**: High activity (bright)
- **Intensity 4**: Very high activity (brightest)

---

## 🔐 Security

### Data Protection
- ✅ Local storage only
- ✅ No cloud transmission
- ✅ Encrypted credentials
- ✅ No telemetry

### Privacy
- ✅ No tracking
- ✅ No analytics
- ✅ No data collection
- ✅ Open source

---

## 📞 Support

### Getting Help
1. Check this guide
2. Review documentation files
3. Check GitHub issues
4. Open new issue if needed

### Reporting Bugs
- Describe the issue
- Include steps to reproduce
- Attach screenshots if possible
- Provide system information

---

## 🎓 Tips & Tricks

### Maximize Productivity
1. Check widget regularly
2. Set daily goals
3. Track streaks
4. Monitor score trends

### Best Practices
1. Keep widget visible
2. Refresh before important meetings
3. Use as motivation tool
4. Share progress with team

---

## 📊 Example Workflow

```
Morning:
├─ Open widget
├─ Check daily score
├─ Review today's tasks
└─ Start coding

Throughout Day:
├─ Widget auto-refreshes
├─ Monitor streak
└─ Complete tasks

Evening:
├─ Check final score
├─ Review progress
└─ Plan tomorrow
```

---

## 🌟 Features Roadmap

### v2.5.0 (Planned)
- [ ] Custom themes
- [ ] Notification system
- [ ] Weekly reports

### v3.0.0 (Future)
- [ ] Mobile app
- [ ] Cloud sync
- [ ] Team dashboard

---

**Widget Version**: 2.4.0  
**Last Updated**: April 30, 2026  
**Status**: Production Ready ✅

---

*Track your productivity. Stay motivated. Keep coding.* 🚀
