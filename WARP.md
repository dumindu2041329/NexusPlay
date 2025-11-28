# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **static gaming landing page** for "NexusPlay" - a fictional gaming platform. The project is built using **vanilla HTML, CSS, and JavaScript** without any frameworks or build tools. It features a modern, cyberpunk-inspired design with animations, interactive elements, and responsive layouts.

## Project Structure

```
Landing Page/
├── index.html      # Main HTML structure (675 lines)
├── styles.css      # Complete styling with animations (1669 lines)
└── script.js       # Interactive functionality (437 lines)
```

## Architecture

### Design System
The project uses a **CSS custom properties** system defined in `:root` for consistent theming:
- Primary color: `#00f0ff` (cyan)
- Secondary color: `#ff00ff` (magenta)
- Accent color: `#7b2cff` (purple)
- Dark backgrounds with gradient overlays
- Consistent spacing, shadows, and transitions

### Page Sections (in order)
1. **Hero Section** - Main landing area with animated stats counter and hexagonal image frame
2. **Games Section** - Filterable game cards with categories (action, rpg, sports, strategy)
3. **Tournaments Section** - Live countdown timer and tournament cards
4. **Features Section** - Platform features in a grid layout
5. **Community Section** - Testimonial carousel with auto-rotation
6. **Pricing Section** - Three-tier pricing cards with hover effects
7. **Newsletter Section** - Email subscription form
8. **Footer** - Multi-column navigation and social links

### JavaScript Architecture

The code is organized into functional sections with clear separation:

1. **DOM Element References** (lines 1-12) - All selectors cached at the top
2. **Event Handlers** - Individual features with their own event listeners
3. **Animation Systems**:
   - Intersection Observer for scroll-triggered animations
   - Countdown timer for tournaments
   - Stats counter animation
   - Testimonial carousel auto-rotation
4. **Interactive Effects**:
   - Parallax mouse movement on floating cards
   - 3D tilt effects on hover
   - Particle animation system
   - Custom smooth scroll

### Key Interactive Features

- **Game Filtering**: Click filter buttons to show/hide games by category
- **Testimonial Carousel**: Auto-rotates every 5 seconds, manual control via dots
- **Tournament Countdown**: Live countdown to December 15, 2024
- **Animated Stats**: Numbers count up when scrolled into view
- **Back to Top**: Smooth scroll button appears after 300px scroll
- **Mobile Navigation**: Hamburger menu for responsive design

## Development Workflow

### Opening Files for Development
Since this is a static site, simply:
1. Open `index.html` in a browser to view the site
2. Edit files in any text editor
3. Refresh the browser to see changes

### Testing in Browser
```powershell
# Windows - Open in default browser
Start-Process "index.html"

# Or use a local server for better testing
# Using Python 3
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

### Making Changes

**To modify content:**
- Edit `index.html` directly - all content is hardcoded in HTML

**To modify styling:**
- Edit `styles.css` - organized by component sections with clear comments
- CSS variables at the top of the file control the color scheme

**To modify interactions:**
- Edit `script.js` - organized by feature with section comments (e.g., `// ===== Games Filter =====`)

## Important Implementation Details

### Animation System
- Uses **Intersection Observer API** for scroll-triggered animations
- Cards and sections fade in when entering viewport (threshold: 0.2)
- Counter animations trigger only when hero stats section is visible

### Countdown Timer
- Hardcoded target date: December 15, 2024
- Updates every second via `setInterval`
- Displays days, hours, minutes, seconds with zero-padding

### Testimonial Carousel
- Three testimonials rotate every 5 seconds
- Uses absolute positioning with opacity transitions
- Dots allow manual navigation
- Only one card has `.active` class at a time

### Game Filtering
- Games have `data-category` attributes (action, rpg, sports, strategy)
- Filter uses display/opacity/transform for smooth transitions
- 300ms CSS transition matches JavaScript timeout

### Responsive Design
Three breakpoints:
- **1200px**: Stack hero section, single-column featured games
- **768px**: Mobile navigation, hide floating cards, simplify layouts
- **480px**: Further reduce font sizes and spacing

### Performance Optimizations
- Debounce and throttle utilities defined (lines 405-427) but not actively used
- Lazy loading structure exists (lines 328-341) for images with `data-src` attribute
- Particles limited to 30 elements
- RequestAnimationFrame used for smooth animations

## Common Tasks

### Update Tournament Date
Edit `script.js` line 189:
```javascript
const countdownDate = new Date('2024-12-15T00:00:00').getTime();
```

### Change Color Scheme
Edit CSS variables in `styles.css` lines 2-20:
```css
:root {
    --primary: #00f0ff;
    --secondary: #ff00ff;
    --accent: #7b2cff;
    /* ... */
}
```

### Add New Game Card
Copy a `.game-card` block in `index.html` (lines 139-158) and modify:
- Image URL in `<img src="...">`
- `data-category` attribute for filtering
- Tags, title, player count, rating

### Modify Animation Speed
Look for these values in `script.js`:
- Counter duration: line 87 (`const duration = 2000`)
- Testimonial rotation: line 178 (`setInterval(nextTestimonial, 5000)`)
- Newsletter message timeout: line 234 (`setTimeout(..., 5000)`)

### Add/Remove Sections
Sections follow a consistent pattern:
```html
<section class="section-name" id="section-id">
    <div class="section-container">
        <div class="section-header">...</div>
        <!-- Section content -->
    </div>
</section>
```

Update navigation links in `index.html` lines 31-35 to match new section IDs.

## Browser Compatibility

The site uses modern JavaScript features:
- Intersection Observer API (no IE11 support)
- Template literals
- Arrow functions
- RequestAnimationFrame
- CSS custom properties

**Target browsers**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)

## External Dependencies

- **Google Fonts**: Orbitron (headings) and Rajdhani (body text)
- **Font Awesome 6.4.0**: Icons via CDN
- **Unsplash Images**: Stock photos via CDN links

No build process or package manager required.

## Notes for Future Development

- All JavaScript is in the global scope - consider wrapping in IIFE or modules if complexity grows
- No form validation beyond HTML5 required attribute
- Newsletter form has simulated submission (setTimeout mock) - needs backend integration
- Sound effects code exists but is commented out (lines 367-376)
- Console easter egg included (lines 379-380)
- Images are loaded from Unsplash CDN - consider hosting locally for production
- No accessibility testing has been done - ARIA labels are minimal
