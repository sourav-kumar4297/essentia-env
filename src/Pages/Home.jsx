// import React from "react";
// import HeroSection from "../Components/homeSections/HeroSection";
// import AboutSection from "../Components/homeSections/AboutSection";
// import WhatWeDoSection from "../Components/homeSections/WhatWeDoSection";
// import CreativeVisionSection from "../Components/homeSections/CreativeVisionSection";
// import ServicesSection from "../Components/homeSections/ServicesSection";
// import ProjectsSection from "../Components/homeSections/ProjectsSection";
// import JournalsSection from "../Components/homeSections/JournalsSection";
// import ReviewSection from "../Components/homeSections/ReviewSection";

// const Home = () => {
//     return (
//         <div className="min-h-screen bg-black text-white font-lato">
//             <HeroSection />
//             <AboutSection />
//             <WhatWeDoSection />
//             <CreativeVisionSection />
//             <ServicesSection />
//             <ProjectsSection />
//             <JournalsSection />
//             {/* <ReviewSection /> */}
//         </div>
//     );
// };

// export default Home;


import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../Components/homeSections/HeroSection";
import AboutSection from "../Components/homeSections/AboutSection";
import WhatWeDoSection from "../Components/homeSections/WhatWeDoSection";
import CreativeVisionSection from "../Components/homeSections/CreativeVisionSection";
import ServicesSection from "../Components/homeSections/ServicesSection";
import ProjectsSection from "../Components/homeSections/ProjectsSection";
// import JournalsSection from "../Components/homeSections/JournalsSection";
import ReviewSection from "../Components/homeSections/ReviewSection";

const Home = () => {

  return (
    <>
      <Helmet>
        <title>Luxury Interior Design & Build Firm in India | essentia</title>
        <meta name="description" content="essentia environments is India's leading luxury interior design & build firm. Architecture, interiors & bespoke furniture - concept to completion since 1999." />
        <meta property="og:title" content="Luxury Interior Design & Build Firm in India | essentia environments" />
        <meta property="og:description" content="essentia environments is India's leading luxury interior design & build firm. Architecture, interiors & bespoke furniture - concept to completion since 1999." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://essentiaenvironments.com/" />
        <meta property="og:site_name" content="essentia environments" />
        <meta property="og:image" content="https://essentiaenvironments.com/black-logo.png" />
        <meta property="og:image:secure_url" content="https://essentiaenvironments.com/black-logo.png" />
        <meta property="og:image:width" content="866" />
        <meta property="og:image:height" content="168" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Luxury Interior Design by essentia environments" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Interior Design & Build Firm in India | essentia environments" />
        <meta name="twitter:description" content="essentia environments is India's leading luxury interior design & build firm. Architecture, interiors & bespoke furniture - concept to completion since 1999." />
        <meta name="twitter:image" content="https://essentiaenvironments.com/black-logo.png" />

        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`{
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
          }`}
        </script>

        {/* Website Schema */}
        <script type="application/ld+json">
          {`{
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
          }`}
        </script>

        {/* WebPage Schema */}
        <script type="application/ld+json">
          {`{
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
          }`}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {`{
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
          }`}
        </script>
      </Helmet>
      <div className="min-h-screen bg-black text-white font-lato">
        {/* Page Sections */}
        <HeroSection />
        <AboutSection />
        <WhatWeDoSection />
        <CreativeVisionSection />
        <ServicesSection />
        <ProjectsSection />
        {/* <JournalsSection /> */}
        <ReviewSection />
      </div>
    </>
  );
};

export default Home;