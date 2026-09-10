# SEO Schema Implementation Guide

Your Essentia Environments website now has complete SEO schema markup configured for search engines.

## What's Been Set Up

### ✅ JSON-LD Schemas (In Home Page)
- **Local Business Schema** - Business info, address, phone, hours, geo-coordinates
- **Website Schema** - Site search functionality
- **WebPage Schema** - Page-specific metadata
- **Organization Schema** - Company details and social links

### ✅ Meta Tags
- Open Graph tags (Facebook, LinkedIn sharing)
- Twitter Card tags
- Canonical URLs
- Meta descriptions

### ✅ Helmet Integration
All schemas are implemented using `react-helmet-async` which ensures:
- Server-friendly rendering (detectable by search engines)
- Per-page customization
- Dynamic meta tag injection

## Build & Deploy

### For Development
```bash
npm run dev
```
Your app runs with full schema markup via Helmet.

### For Production Build
```bash
npm run build
```
This:
1. Builds your React app with Vite
2. Runs the SEO schema generator script
3. Generates SSR-ready HTML with all schemas

### Preview Built Version
```bash
npm run preview
```
Visit http://localhost:4173 to see your built app with all schemas.

## Testing SEO Schemas

After building, you can validate your schemas:

### 1. Google Rich Results Test
- Go to: https://search.google.com/test/rich-results
- Enter your deployment URL
- ✓ Should show all 4 schemas detected

### 2. Schema.org Validator  
- Go to: https://validator.schema.org/
- Enter your URL
- ✓ Should validate all schema types

### 3. Local Testing with View Source
1. Run `npm run preview`
2. Visit http://localhost:4173
3. Right-click → View Page Source
4. Search for `<script type="application/ld+json">`
5. You should see all 4 schemas in the HTML

## Schema Details

### Local Business Schema
```
- Name: Essentia Environments
- Type: HomeAndConstructionBusiness
- Address: Gurugram, Haryana
- Phone: +91-9810088877
- Hours: 10-7 (Mon-Fri), Special Sat schedule, 9-6 (Sun)
- Geo: 28.4326°N, 77.0428°E
- Social: Facebook, Instagram, LinkedIn
```

### Organization Schema
```
- Name: Essentia Environments
- Legal Name: Essentia Designs Private Limited
- Logo: Company logo URL
- Contact: +91-9810088877
- Service Area: India (IN)
- Languages: English, Hindi
```

## How Helmet Makes This SEO-Friendly

Your Home.jsx uses Helmet like this:

```jsx
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
  <script type="application/ld+json">{JSON.stringify(schema)}</script>
</Helmet>
```

Helmet ensures:
- ✓ Search engines see the schemas in HTML
- ✓ React components stay clean and organized
- ✓ Easy to add/update schemas per page
- ✓ Compatible with deployment platforms

## Deployment

When you deploy your built version:

1. Upload the `dist/` folder
2. Serve `dist/index.html` for all routes (SPA routing)
3. Search engines will immediately detect:
   - All JSON-LD schemas
   - Meta tags
   - Canonical URLs
   - Page titles & descriptions

## Next Steps

1. ✅ Schemas are ready - build and deploy!
2. After deployment, use Google Search Console to monitor:
   - Coverage (indexed pages)
   - Mobile usability
   - Rich results
3. Update schemas as needed by editing [src/Pages/Home.jsx](src/Pages/Home.jsx)

## Files Reference

- **Home Page Schemas**: [src/Pages/Home.jsx](src/Pages/Home.jsx)
- **Testimonials (60+)**: [src/Components/homeSections/ReviewSection.jsx](src/Components/homeSections/ReviewSection.jsx)
- **Schema Generator**: [scripts/generate-ssr-html.mjs](scripts/generate-ssr-html.mjs)

