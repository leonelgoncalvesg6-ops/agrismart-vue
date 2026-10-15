# AgriSmart (Vue 3 + Vite)

A Vue 3 rebuild of the AgriSmart mockups.

## Pages included
- **Home** (`/`) — hero with background photo and stat pills, "What We
  Offer" 6-card grid, 4-step "How It Works" timeline, featured crops
  strip, farming tips section, and a closing CTA banner.
- **Crops** (`/crops`) — crop library grid with search, filters, and a
  recommendation CTA.
- **Diseases & Pests** (`/diseases-pests`) — disease/pest guide grid with
  severity tags, a disclaimer banner, and a 3-column info panel.
- **Farming Guides** (`/farming-guides`) — searchable guide library with
  difficulty tags and category filtering.
- **Smart Tools** (`/smart-tools`) — cost & profit calculator (fetches cost
  categories and items from API) and a farm task planner.
- **Weather** (`/weather`) — multi-region weather forecasts grouped by
  date with farm-specific advice for each condition.
- **About** (`/about`) — mission statement, core values, platform
  features overview, and contact information.

## Structure
```
src/
  api.js               API helper functions (fetch wrappers)
  components/
    Navbar.vue           shared top nav
    SiteFooter.vue       shared footer
    FilterBar.vue        dropdown filter chips
    CropCard.vue         card used on the Crops page
    IssueCard.vue        card used on the Diseases & Pests page
  views/
    Home.vue
    Crops.vue
    DiseasesPests.vue
    FarmingGuides.vue
    SmartTools.vue
    Weather.vue
    About.vue
  router/index.js         vue-router routes
  assets/main.css        design tokens (colors, type, spacing) + resets
server/
  server.js              Express API server (port 3001)
  db.js                  SQLite database init + schema
  seed.js                Database seed script
  agrismart.db           SQLite database file (created on first run)
```

## Run it

### 1. Backend
```bash
cd server
npm install
npm run seed    # seed the database with initial data
npm run dev     # start the API server at http://localhost:3001
```

### 2. Frontend
```bash
npm install
npm run dev
```
Then open the local URL Vite prints (usually http://localhost:5173).

The Vite dev server proxies `/api/*` requests to the backend on port 3001.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/crops` | List all crops (supports `?search=&category=&difficulty=&season=&water=&soil_type=`) |
| GET | `/api/crops/featured` | First 6 crops (for homepage) |
| GET | `/api/crops/:id` | Single crop by ID |
| GET | `/api/diseases-pests` | List all diseases/pests (supports `?search=&type=&affected_crop=&severity=`) |
| GET | `/api/diseases-pests/:id` | Single disease/pest by ID |
| GET | `/api/tips` | List all farming tips |
| GET | `/api/home` | Aggregated homepage data (offer items, steps, featured crops, tips) |
| GET | `/api/farming-guides` | List all farming guides (supports `?search=&category=&difficulty=`) |
| GET | `/api/farming-guides/:id` | Single farming guide by ID |
| GET | `/api/weather` | List all weather forecasts (supports `?location=`) |
| GET | `/api/cost-calculator` | Cost categories with nested cost items for the calculator |
| GET | `/api/health` | Health check |

## Notes
- Crop/issue/tips data is now served from the Express + SQLite backend.
- Images are placeholder Unsplash URLs; replace with your own asset paths.
- Colors, fonts, radii, and shadows all live as CSS custom properties in
  `src/assets/main.css` for easy re-theming.
