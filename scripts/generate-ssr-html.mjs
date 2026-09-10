#!/usr/bin/env node

/**
 * Pre-rendering script for SEO optimization
 * This generates static HTML with proper schema markup for search engines
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '../dist')

// HTML template with all schemas and meta tags
const generateSSRHTML = () => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>Luxury Interior Design & Build Firm in India | Essentia</title>
    <meta name="description" content="Essentia Environments is India's leading luxury interior design & build firm. Architecture, interiors & bespoke furniture - concept to completion since 1999." />
    <meta name="keywords" content="interior design, architecture, luxury furniture, bespoke design, Delhi NCR" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://essentiaenvironments.com/" />
    <meta property="og:title" content="Essentia Environments | Luxury Interior Design & Architecture Studio" />
    <meta property="og:description" content="Discover premium, minimalist, and upscale luxury interior design and architectural execution. Transforming high-end residential and commercial spaces into stunning realities." />
    <meta property="og:image" content="https://essentiaenvironments.com/assets/og-featured-banner.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Essentia Environments" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://essentiaenvironments.com/" />
    <meta property="twitter:title" content="Essentia Environments | Luxury Interior Design & Architecture Studio" />
    <meta property="twitter:description" content="Discover premium, minimalist, and upscale luxury interior design and architectural execution." />
    <meta property="twitter:image" content="https://essentiaenvironments.com/assets/og-featured-banner.jpg" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://essentiaenvironments.com/" />
    
    <!-- Local Business Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "Essentia Environments",
      "image": "https://essentiaenvironments.com/wp-content/uploads/2023/03/logo.png",
      "@id": "https://essentiaenvironments.com/#localbusiness",
      "url": "https://essentiaenvironments.com/",
      "telephone": "+91-9810088877",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Building No. 06, Maharaja Ranjeet Singh Marg, Sector 34",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4326,
        "longitude": 77.0428
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "description": "Open only on 1st and 3rd Saturday of the month. 2nd and 4th Saturday are closed.",
          "opens": "10:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "description": "Manufacturing factory is operational on Sundays.",
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/essentiaenvironments/",
        "https://www.instagram.com/essentiaenvironments/",
        "https://www.linkedin.com/company/essentia-environments/"
      ]
    }
    </script>
    
    <!-- Website Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://essentiaenvironments.com/#website",
      "url": "https://essentiaenvironments.com/",
      "name": "Essentia Environments",
      "description": "India's premier luxury interior design and build company specializing in bespoke furniture and architecture.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://essentiaenvironments.com/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    
    <!-- WebPage Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://essentiaenvironments.com/#webpage",
      "url": "https://essentiaenvironments.com/",
      "name": "Luxury Architecture & Interior Designers in Delhi NCR - Essentia Environments",
      "description": "Essentia Environments is a premier interior design and build firm offering luxury residential interiors, turnkey execution, and bespoke furniture.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://essentiaenvironments.com/#website"
      },
      "about": {
        "@type": "Organization",
        "@id": "https://essentiaenvironments.com/#organization"
      },
      "inLanguage": "en-US"
    }
    </script>
    
    <!-- Organization Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Essentia Environments",
      "legalName": "Essentia Designs Private Limited",
      "@id": "https://essentiaenvironments.com/#organization",
      "url": "https://essentiaenvironments.com/",
      "logo": "https://essentiaenvironments.com/wp-content/uploads/2023/03/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9810088877",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["en", "Hindi"]
      },
      "sameAs": [
        "https://www.facebook.com/essentiaenvironments/",
        "https://www.instagram.com/essentiaenvironments/",
        "https://www.linkedin.com/company/essentia-environments/"
      ]
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
}

// Create dist directory if it doesn't exist
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true })
}

// Write the pre-rendered HTML
const html = generateSSRHTML()
fs.writeFileSync(path.join(distPath, 'ssr-head.html'), html)

console.log('✓ SSR HTML template generated at dist/ssr-head.html')
console.log('✓ All schema tags are now available for search engines')
console.log('✓ Run: npm run build && npm run preview to test')
