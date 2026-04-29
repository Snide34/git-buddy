# 🎯 Dual Dashboard Update

## ✨ What's New

Your widget has been transformed into a **dual-dashboard productivity tracker** with:

### 📊 Side-by-Side Monthly Calendars
- **LeetCode Dashboard** (left) - Shows all problems solved this month
- **GitHub Dashboard** (right) - Shows all commits this month
- **Real-time sync** - Updates automatically every 30 minutes

### 🗓️ Current Month View
- Full calendar grid for April 2026
- Each day shows:
  - Day number
  - Activity count (problems/commits)
  - Color intensity based on activity level
- **Today highlighted** with purple border

### 🎨 Color Coding
**LeetCode (Yellow/Orange):**
- Level 0: No activity (dark)
- Level 1: 1-2 problems (light orange)
- Level 2: 3-5 problems (medium orange)
- Level 3: 6-10 problems (bright orange)
- Level 4: 10+ problems (full orange + glow)

**GitHub (Blue):**
- Level 0: No activity (dark)
- Level 1: 1-2 commits (light blue)
- Level 2: 3-5 commits (medium blue)
- Level 3: 6-10 commits (bright blue)
- Level 4: 10+ commits (full blue + glow)

---

## 🚀 Features

### Interactive Calendar
- **Hover** - Cell scales up, shows tooltip with date and count
- **Today** - Purple border with glow effect
- **Activity levels** - 5 levels of intensity (0-4)
- **Smooth animations** - Hover effects, transitions

### Real-Time Data
- Fetches from **LeetCode GraphQL API**
- Fetches from **GitHub REST API**
- Builds contribution calendar from submission history
- Updates every 30 minutes automatically

### Layout
- **900px wide** widget (expanded from 400px)
- **Two equal columns** for LeetCode and GitHub
- **Glassmorphism** background with noise texture
- **Premium polish** with shadows and borders

---

## 📁 New Files

### `src/components/ContributionGraph.jsx`
- Generates monthly calendar grid
- Calculates activity levels
- Handles empty days (before month starts)
- Highlights today
- Shows day numbers and counts

### Updated Files
- `src/components/Widget.jsx` - New dual-dashboard layout
- `src/services/leetcode.js` - Added `contributionCalendar` data
- `src/services/github.js` - Added `contributionCalendar` data
- `src/index.css` - Added calendar grid styles

---

## 🎯 How It Works

### Data Flow
1. **App.jsx** fetches data from APIs
2. **LeetCode service** returns `contributionCalendar` object:
   ```javascript
   {
     "2026-04-01": 3,  // 3 problems on April 1
     "2026-04-02": 5,  // 5 problems on April 2
     ...
   }
   ```
3. **GitHub service** returns `contributionCalendar` object:
   ```javascript
   {
     "2026-04-01": 7,  // 7 commits on April 1
     "2026-04-02": 2,  // 2 commits on April 2
     ...
   }
   ```
4. **ContributionGraph** component:
   - Generates calendar grid for current month
   - Maps data to each day
   - Calculates activity level (0-4)
   - Renders colored cells

### Calendar Generation
```javascript
// Get current month details
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

// Get first day and total days
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);
const totalDays = lastDay.getDate();

// Build grid with weeks
// Add empty cells for days before month starts
// Add all days of month with data
// Add empty cells to complete last week
```

---

## 🎨 Visual Design

### Calendar Cell States
```css
/* Empty (before month) */
background: transparent;

/* No activity */
background: rgba(255, 255, 255, 0.05);

/* Low activity (1-2) */
background: rgba(color, 0.3);

/* Medium activity (3-5) */
background: rgba(color, 0.5);

/* High activity (6-10) */
background: rgba(color, 0.7);

/* Max activity (10+) */
background: rgba(color, 1);
box-shadow: 0 0 12px rgba(color, 0.6);
```

### Hover Effect
```css
transform: scale(1.1);
z-index: 10;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
```

### Today Highlight
```css
border: 2px solid rgba(139, 92, 246, 0.8);
box-shadow: 0 0 16px rgba(139, 92, 246, 0.4);
```

---

## 📊 Example Data Structure

### LeetCode Response
```javascript
{
  solvedToday: 3,
  totalSolved: 250,
  monthlyProgress: 60,
  ranking: 12345,
  contributionCalendar: {
    "2026-04-01": 2,
    "2026-04-02": 1,
    "2026-04-03": 0,
    "2026-04-04": 3,
    ...
  }
}
```

### GitHub Response
```javascript
{
  commitsToday: 5,
  reposActive: 2,
  totalRepos: 15,
  contributionCalendar: {
    "2026-04-01": 7,
    "2026-04-02": 3,
    "2026-04-03": 0,
    "2026-04-04": 5,
    ...
  }
}
```

---

## 🔄 Real-Time Sync

### Auto-Refresh (30 minutes)
```javascript
useEffect(() => {
  if (config?.leetcodeUsername && config?.githubUsername) {
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }
}, [config]);
```

### Manual Refresh
- Click **↻ button** in header
- Fetches latest data immediately
- Updates both calendars

### Offline Fallback
- Caches last successful fetch
- Shows cached data when APIs unavailable
- Persists across app restarts

---

## 🎯 Usage

### First Time Setup
1. Widget opens with empty calendars
2. Click **⚙️ Settings**
3. Enter LeetCode username
4. Enter GitHub username
5. (Optional) Add GitHub token
6. Click **Save**

### Daily Use
- Widget shows current month (April 2026)
- Updates automatically every 30 minutes
- Hover over days to see details
- Today is highlighted with purple border
- Color intensity shows activity level

### What You'll See
- **Empty days** (gray) - No activity
- **Light colors** - Some activity
- **Bright colors** - High activity
- **Glowing cells** - Maximum activity (10+)
- **Purple border** - Today

---

## 🚀 Next Steps

### Potential Enhancements
1. **Month Navigation** - Previous/next month buttons
2. **Year View** - Show all 12 months
3. **Stats Summary** - Total problems/commits for month
4. **Streak Indicator** - Highlight consecutive days
5. **Export Data** - Download calendar as image
6. **Comparison Mode** - Compare with previous month
7. **Goal Setting** - Set monthly targets
8. **Notifications** - Remind to maintain streak

### Advanced Features
- **Heatmap Intensity** - Adjust color thresholds
- **Custom Colors** - Choose your own color scheme
- **Multiple Accounts** - Track multiple LeetCode/GitHub accounts
- **Team View** - Compare with friends
- **Analytics** - Best day/time insights

---

## 📱 Responsive Design

Current: **900px wide** (dual dashboard)

Future responsive breakpoints:
- **< 800px**: Stack vertically
- **< 600px**: Single column, scrollable
- **> 1200px**: Add third column (stats/analytics)

---

## 🎨 Design Inspiration

- **GitHub Contribution Graph** - Calendar layout
- **Linear** - Clean, minimal design
- **Raycast** - Glassmorphism effects
- **Apple Calendar** - Month view grid

---

## 💡 Pro Tips

### Maximize Activity
- **LeetCode**: Solve 3+ problems daily for bright orange
- **GitHub**: Make 5+ commits daily for bright blue
- **Consistency**: Aim for no gray days

### Visual Goals
- **Fill the calendar** - No empty days
- **Bright colors** - High activity levels
- **Glowing cells** - 10+ problems/commits

### Motivation
- **See your progress** - Visual feedback
- **Maintain streaks** - Consecutive days
- **Compare platforms** - Balance practice and coding

---

Built with ❤️ for developers who want to visualize their coding journey 🚀
