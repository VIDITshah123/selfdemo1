# Bellavierre Real Estate — Landing Page Documentation

## Project Overview

**Client:** Bellavierre Real Estate  
**Project Type:** Luxury Real Estate Landing Page — Dubai  
**Framework:** React + Vite  
**Status:** Working Prototype (Home Page)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite 8 | Build tool & dev server |
| Framer Motion | Animations, transitions, parallax |
| Lucide React | UI icons |
| Google Fonts | Cormorant Garamond, Inter |

---

## Running the Project

```bash
cd bellavierre
npm install
npm run dev
```

Opens at: **http://localhost:5173/**

To build for production:
```bash
npm run build
```

---

## Page Sections

1. **Loader** — Animated logo intro with progress bar
2. **Navbar** — Fixed, scroll-aware, mobile hamburger menu
3. **Hero** — Full-viewport parallax hero with Dubai skyline
4. **Search Bar** — Buy / Rent / Off-Plan property search
5. **Marquee** — Infinite scrolling neighborhoods strip  
6. **Features / Why Us** — 4-column grid of agency differentiators
7. **Featured Properties** — 4 luxury listings with image hover effects
8. **Parallax CTA Banner** — Mid-page parallax call-to-action
9. **About Us** — Team photo, stats, founder signatures
10. **Neighborhoods** — Horizontally scrollable Dubai areas
11. **Testimonials** — 3-column client reviews with star ratings
12. **Contact** — Enquiry form with success state
13. **Footer** — Links, social, legal info

---

## Design System

**Color Palette:**
- Gold: `#c9a84c` (primary brand accent)
- Gold Light: `#f5d07a`
- Gold Dark: `#9d7a2e`
- Dark Background: `#0a0a0a`
- White: `#ffffff`

**Typography:**
- Headlines: Cormorant Garamond (luxury serif)
- Body: Inter (clean sans-serif)

**Animations:**
- Parallax scrolling on Hero and CTA sections
- Scroll-triggered fade-up entrance animations (Framer Motion)
- Image zoom on property card hover
- Gold underline slide on nav links
- Cursor glow effect (desktop)
- Smooth page loader transition

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| Desktop (>1024px) | Full layout, all columns |
| Tablet (768-1024px) | 2-column grids, hidden desktop nav |
| Mobile (<768px) | Single column, hamburger menu |
| Small Mobile (<480px) | Compact typography |

---

## Image Assets

All images stored in `/bellavierre/public/images/`:

- `hero_dubai_skyline.jpg` - Hero parallax background (Dubai Marina)
- `property_penthouse.jpg` - Penthouse interior with Burj Khalifa view
- `property_villa.jpg` - Palm Jumeirah villa with infinity pool
- `property_apartment.jpg` - Marina apartment at night
- `property_townhouse.jpg` - Dubai Hills townhouse exterior
- `about_team.jpg` - Professional team photo

---

## File Structure

```
bellavierre/
├── public/
│   ├── logo.png              # Bellavierre brand logo
│   └── images/               # Property & hero images
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Marquee.jsx
│   │   ├── Features.jsx
│   │   ├── Properties.jsx
│   │   ├── ParallaxBanner.jsx
│   │   ├── About.jsx
│   │   ├── Neighborhoods.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   ├── App.jsx               # Root component
│   ├── index.css             # Global design system CSS
│   └── main.jsx              # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## Next Steps (Future Pages)

- Properties listing page with filters
- Individual property detail page
- Off-Plan projects page
- Team / About page
- Blog / Market Insights

---

*Generated for Bellavierre Real Estate — October 2026*
