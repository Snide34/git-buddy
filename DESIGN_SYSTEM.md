# DevPulse Pro - Design System

## Overview
DevPulse Pro is a premium desktop productivity widget featuring a modern glassmorphism design with a 2x2 grid layout showcasing LeetCode and GitHub activity tracking.

---

## Visual Design

### Color Palette

#### Primary Colors
- **Primary Blue**: `#aac7ff` - Main accent color for buttons and highlights
- **Primary Dark**: `#003064` - Text on primary backgrounds
- **Primary Container**: `#3e90ff` - Container backgrounds

#### Secondary Colors
- **GitHub Green**: `#47e266` - GitHub activity indicator
- **GitHub Dark**: `#002106` - GitHub text

#### Tertiary Colors
- **LeetCode Orange**: `#ce7f00` - LeetCode activity indicator
- **LeetCode Light**: `#ffb868` - LeetCode highlights

#### Neutral Colors
- **Background**: `#131315` - Main background
- **Surface**: `#131315` - Card backgrounds
- **Surface Container**: `#1f1f21` - Nested containers
- **On Surface**: `#e4e2e4` - Primary text
- **On Surface Variant**: `#c0c6d6` - Secondary text
- **Outline**: `#8b91a0` - Borders

#### Status Colors
- **Error**: `#ffb4ab` - Error states
- **Success**: `#4ADE80` - Completed tasks

### Typography

#### Font Family
- **Primary**: Inter (400, 500, 600, 700, 800, 900)
- **Monospace**: Space Grotesk (500)

#### Font Sizes
- **Display**: 24px (600 weight, -0.02em letter-spacing)
- **Headline**: 18px (600 weight, -0.01em letter-spacing)
- **Body**: 14px (400 weight)
- **Body Small**: 12px (400 weight)
- **Label**: 11px (700 weight, 0.05em letter-spacing)
- **Mono Data**: 13px (500 weight, -0.01em letter-spacing)

### Spacing System

- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **Widget Padding**: 16px
- **Card Gap**: 12px

### Border Radius

- **Default**: 4px
- **LG**: 8px
- **XL**: 12px
- **Full**: 9999px

---

## Component Design

### Glass Container
```css
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.15);
background: rgba(19, 19, 21, 0.7);
border-radius: 12px;
```

### Glass Card Nested
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 8px;
```

### Glow Effects
- **GitHub Glow**: `box-shadow: 0 0 8px #47e266`
- **LeetCode Glow**: `box-shadow: 0 0 8px #ce7f00`

---

## Layout

### Main Grid
- **Type**: 2x2 CSS Grid
- **Gap**: 12px
- **Max Width**: 960px
- **Height**: 720px

### Cards
1. **LeetCode Card** (Top Left)
   - Activity heatmap (7x5 grid)
   - Problem statistics (Easy, Medium, Hard)
   - Today's count badge

2. **GitHub Card** (Top Right)
   - Contribution heatmap (7x5 grid)
   - Last commit time
   - Progress bar

3. **Today's Grind** (Bottom Left)
   - Task checklist
   - Category labels
   - Completion status

4. **Current Sprint** (Bottom Right)
   - Progress bars
   - Deadline warning
   - Sprint information

### Bottom Summary Bar
- **Position**: Fixed bottom
- **Content**: Streak counter, Daily score, Refresh button
- **Width**: Max 960px

---

## Interactions

### Hover States
- Cards: `background: rgba(255, 255, 255, 0.1)`
- Buttons: `filter: brightness(1.1)`
- Heatmap cells: `transform: scale(1.1)`

### Active States
- Buttons: `transform: scale(0.95)`
- Transitions: `all 0.2s ease`

### Loading States
- Disabled buttons: `opacity: 0.7`
- Loading text: "Loading..."
- Spinner animation

---

## Animations

### Breathing Background
```css
animation: meshBreathing 8s ease-in-out infinite;
```

### Glow Pulse
```css
box-shadow: 0 0 8px rgba(color, 0.5);
```

### Smooth Transitions
```css
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Responsive Design

### Desktop (960px+)
- Full 2x2 grid layout
- All cards visible
- Bottom summary bar

### Tablet (768px - 959px)
- Stacked layout
- Cards full width
- Adjusted spacing

### Mobile (< 768px)
- Single column
- Simplified layout
- Touch-friendly buttons

---

## Accessibility

### Color Contrast
- Text on background: WCAG AA compliant
- Minimum contrast ratio: 4.5:1

### Focus States
- Visible focus indicators
- Keyboard navigation support
- Screen reader friendly

### Typography
- Readable font sizes
- Proper line heights
- Clear hierarchy

---

## Dark Mode

The entire design is optimized for dark mode with:
- Deep background gradients
- High contrast text
- Subtle borders
- Glowing accents

---

## Component States

### LeetCode Card
- **Active**: Orange glow, full opacity
- **Inactive**: Dimmed, 50% opacity
- **Loading**: Shimmer effect

### GitHub Card
- **Active**: Green glow, full opacity
- **Inactive**: Dimmed, 50% opacity
- **Loading**: Shimmer effect

### Task Items
- **Completed**: Strikethrough, dimmed
- **Pending**: Normal styling
- **Hover**: Highlighted background

### Progress Bars
- **Active**: Gradient fill with glow
- **Inactive**: Dimmed background
- **Animated**: Smooth width transition

---

## Icons

### Material Design Icons
- Dashboard
- Analytics
- Bolt
- Timer
- Menu Book
- Support
- Notifications
- Settings
- Code
- Terminal
- Checklist
- Rocket Launch
- Info
- Local Fire Department
- Insights

### Emoji Icons
- 💻 LeetCode
- 🔵 GitHub
- ✓ Completed
- 🚀 Sprint
- 🔥 Streak
- 📊 Score

---

## Best Practices

### Performance
- Use CSS transforms for animations
- Minimize repaints
- Optimize backdrop-filter usage
- Lazy load images

### Maintainability
- Use CSS variables for colors
- Consistent spacing scale
- Reusable component classes
- Clear naming conventions

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color not only indicator

---

## Future Enhancements

1. **Themes**
   - Light mode variant
   - Custom color schemes
   - High contrast mode

2. **Animations**
   - Micro-interactions
   - Page transitions
   - Loading animations

3. **Responsive**
   - Mobile optimizations
   - Tablet layouts
   - Touch gestures

4. **Customization**
   - Widget sizing
   - Layout options
   - Color preferences

---

**Design System Version**: 1.0.0  
**Last Updated**: April 30, 2026  
**Status**: Production Ready ✅
