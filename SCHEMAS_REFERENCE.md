# SEO Schemas Reference - What's in Your Code

## Location
All schemas are in: **`src/Pages/Home.jsx`** inside the `<Helmet>` component

---

## Schema 1: Local Business
```json
{
  "@type": "HomeAndConstructionBusiness",
  "name": "Essentia Environments",
  "telephone": "+91-9810088877",
  "address": {
    "streetAddress": "Building No. 06, Maharaja Ranjeet Singh Marg, Sector 34",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122004"
  },
  "geo": {
    "latitude": 28.4326,
    "longitude": 77.0428
  },
  "openingHoursSpecification": [
    { "dayOfWeek": ["Monday-Friday"], "opens": "10:00", "closes": "19:00" },
    { "dayOfWeek": "Saturday", "opens": "10:00", "closes": "19:00" },
    { "dayOfWeek": "Sunday", "opens": "09:00", "closes": "18:00" }
  ]
}
```
**Purpose**: Helps Google show business in local search, Maps, and Knowledge Panel

---

## Schema 2: Website
```json
{
  "@type": "WebSite",
  "name": "Essentia Environments",
  "url": "https://essentiaenvironments.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://essentiaenvironments.com/?s={search_term_string}"
  }
}
```
**Purpose**: Enables sitelinks search box in Google SERP (Search Engine Results Page)

---

## Schema 3: WebPage
```json
{
  "@type": "WebPage",
  "@id": "https://essentiaenvironments.com/#webpage",
  "name": "Luxury Architecture & Interior Designers in Delhi NCR",
  "description": "Essentia Environments is a premier interior design and build firm...",
  "isPartOf": {
    "@id": "https://essentiaenvironments.com/#website"
  },
  "about": {
    "@id": "https://essentiaenvironments.com/#organization"
  }
}
```
**Purpose**: Provides page-level metadata, connects to website and organization

---

## Schema 4: Organization
```json
{
  "@type": "Organization",
  "name": "Essentia Environments",
  "legalName": "Essentia Designs Private Limited",
  "logo": "https://essentiaenvironments.com/wp-content/uploads/2023/03/logo.png",
  "contactPoint": {
    "telephone": "+91-9810088877",
    "contactType": "customer service",
    "areaServed": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/essentiaenvironments/",
    "https://www.instagram.com/essentiaenvironments/",
    "https://www.linkedin.com/company/essentia-environments/"
  ]
}
```
**Purpose**: Organization identification, brand consistency, social verification

---

## Meta Tags (Also in Home.jsx)

### Open Graph (Facebook, LinkedIn, WhatsApp)
```html
<meta property="og:title" content="Essentia Environments | Luxury Interior Design & Architecture" />
<meta property="og:description" content="Premium design execution..." />
<meta property="og:image" content="https://essentiaenvironments.com/assets/og-featured-banner.jpg" />
<meta property="og:url" content="https://essentiaenvironments.com/" />
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Essentia Environments | Luxury Interior Design" />
<meta name="twitter:image" content="https://essentiaenvironments.com/assets/og-featured-banner.jpg" />
```

### Basic Meta
```html
<title>Luxury Interior Design & Build Firm in India | Essentia</title>
<meta name="description" content="Essentia Environments is India's leading luxury interior design..." />
```

---

## How It All Works Together

```
Home Page (src/Pages/Home.jsx)
    ↓
React-Helmet-Async Component
    ├─ Reads schema data
    ├─ Injects into <head>
    └─ Sends to browsers + search engines
    ↓
Search Engine Crawls Page
    ├─ Finds Local Business Schema → Shows in Google Maps
    ├─ Finds Organization Schema → Verifies brand
    ├─ Finds WebSite Schema → Enables search sitelinks
    ├─ Finds Open Graph → Better social sharing
    └─ Finds Canonical URL → Prevents duplicate content
    ↓
Result: Rich snippets, Knowledge Panel, Local Search listing
```

---

## Testing What's Actually Rendered

### In Browser (Right Now)
```bash
npm run preview
```
Then:
1. Visit http://localhost:4173
2. Right-click → View Page Source
3. Press Ctrl+F and search for: `application/ld+json`
4. You should see all 4 schema scripts in the `<head>`

### Using Online Validators
- **Paste your URL** into:
  - https://search.google.com/test/rich-results
  - https://validator.schema.org/
- **See detected schemas** - all 4 should appear

---

## File to Edit for Updates

**All schemas are in**: `src/Pages/Home.jsx`

```jsx
<Helmet>
  {/* Meta tags */}
  <title>...</title>
  <meta ... />
  
  {/* Schema 1: Local Business */}
  <script type="application/ld+json">{`{ ... }`}</script>
  
  {/* Schema 2: Website */}
  <script type="application/ld+json">{`{ ... }`}</script>
  
  {/* Schema 3: WebPage */}
  <script type="application/ld+json">{`{ ... }`}</script>
  
  {/* Schema 4: Organization */}
  <script type="application/ld+json">{`{ ... }`}</script>
</Helmet>
```

To update:
1. Edit the JSON objects inside the scripts
2. Save the file
3. Rebuild: `npm run build`
4. Test with validators above

---

## Data to Keep Updated

| Item | Where | Update When |
|------|-------|-------------|
| Phone | Organization & Local Business | Number changes |
| Hours | Local Business | Hours change |
| Address | Local Business | Office moves |
| Logo | Organization | Rebrand |
| Social URLs | Organization | Add/remove social |
| Logo image | og:image | Logo changes |

---

That's it! Your SEO infrastructure is now production-ready. 🚀
