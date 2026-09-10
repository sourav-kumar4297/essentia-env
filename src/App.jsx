
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SmoothScroll from "./Components/SmoothScroll";
import GlobalLoader from "./Components/GlobalLoader";
import NoIndexPage from "./Components/NoIndexPage";
import ChatbotWidget from "./Components/chatBot/ChatbotWidget";

// Lazy Loaded Pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const CompanyProfile = lazy(() => import("./Pages/CompanyProfile"));
const Projects = lazy(() => import("./Pages/Projects"));
const Services = lazy(() => import("./Pages/Services"));
const Contact = lazy(() => import("./Pages/Conatct"));
const Career = lazy(() => import("./Pages/Career"));
const Media = lazy(() => import("./Pages/Media"));
const EssentiaEdits = lazy(() => import("./Pages/EssentiaEdits"));
const Blog = lazy(() => import("./Pages/Blog"));
const Designer = lazy(() => import("./Pages/Designer"));
const Testimonials = lazy(() => import("./Pages/Testimonials"));
const ThankYou = lazy(() => import("./Components/thankYou"));
const Catalogues = lazy(() => import("./Components/catalogueSections/Catalogues"));
const SalesKit = lazy(() => import("./Pages/SalesKit"));
const SalesKitDetail = lazy(() => import("./Components/salesKit/SalesKitDetail"));
const Landing = lazy(() => import("./Pages/Landing"));

const ProjectDetailPage = lazy(() =>
  import("./Components/ProjectSection/ProjectDetail")
);
const BlogDetailPage = lazy(() =>
  import("./Components/bloagSection/BlogDetailPage")
);
const MediaDetailPage = lazy(() =>
  import("./Components/mediaSections/MediaDetailPage")
);
const ArticleDetailPage = lazy(() =>
  import("./Components/mediaSections/MediaDetailPage")
);
const ServiceDetailPages = lazy(() =>
  import("./Components/servicesSections/ServiceDetailPages")
);

const StaticHtml = ({ to }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return <GlobalLoader />;
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Lenis owns scroll here, so plain window.scrollTo gets overridden on the next raf tick.
    // Drive Lenis directly when it's ready; keep window.scrollTo as a fallback before it mounts.
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

// Main Content Wrapper to handle Header/Footer visibility logic
const AppContent = () => {
  const location = useLocation();
  const hideChrome = location.pathname === "/landing";

  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <div className="font-lato min-h-screen bg-black flex flex-col">
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {!hideChrome && <Header />}
      {!hideChrome && <ChatbotWidget />}
      <main className="flex-grow">
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="/company-profile" element={<CompanyProfile />} />

            <Route path="/designer" element={<Designer />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetailPages />} />
            <Route path="/design" element={<Navigate to="/services#design" replace />} />
            <Route path="/build" element={<Navigate to="/services#build" replace />} />
            <Route path="/furniture" element={<Navigate to="/services#furniture" replace />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/vasant-vihar-villa" element={<Navigate to="/projects" replace />} />

            <Route path="/catalogues" element={<Catalogues />} />

            <Route path="/landing" element={<Landing />} />
            <Route path="/sales-kit" element={<SalesKit />} />
            <Route path="/sales-kit/:slug" element={<SalesKitDetail />} />
            <Route path="/awards" element={<StaticHtml to="/awards/index.html" />} />
            <Route path="/luxury-interior-designers-gurgaon" element={<StaticHtml to="/luxury-interior-designers-gurgaon/index.html" />} />

            <Route path="/career" element={<Career />} />
            <Route path="/intern-id" element={<Navigate to="/career" replace />} />

            <Route path="/media" element={<Media />} />
            <Route path="/media/:slug" element={<MediaDetailPage />} />
            <Route path="/media/essentia-edits" element={<EssentiaEdits />} />
            <Route path="/essentia-edits" element={<EssentiaEdits />} />
            <Route path="/essenstia edits" element={<EssentiaEdits />} />
            <Route path="/essentia edits" element={<EssentiaEdits />} />

            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogDetailPage />} />

            <Route path="/testimonials" element={<Testimonials />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/consultations" element={<Navigate to="/contact" replace />} />

            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/consultations/thank-you" element={<Navigate to="/thank-you" replace />} />


            {/* NoIndex*/}
            <Route path="/consultations/author/admin_sourav" element={<NoIndexPage />} />
            <Route path="/consultations/2025/05/06/hello-world" element={<NoIndexPage />} />
          </Routes>
        </Suspense>
      </main>

      {!hideChrome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </Router>
    </HelmetProvider>
  );
}

export default App;