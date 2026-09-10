import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TOTAL_PAGES = 30;

// Pages with clickable links
const PAGE_LINKS = {
  16: "https://essentia.in/",
  17: "https://essentiaenvironments.com/",
  18: "https://www.essentiahome.com/",
};

function PdfPage({ pageNum }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(pageNum <= 5);
  const ref = useRef(null);
  const link = PAGE_LINKS[pageNum];

  useEffect(() => {
    if (pageNum <= 5) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pageNum]);

  return (
    <section ref={ref} className="relative w-full">
      {/* Page number */}
      <div
        className="absolute top-6 right-6 z-10 text-xs tracking-widest uppercase select-none"
        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "inherit" }}
      >
        {String(pageNum).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
      </div>

      {inView ? (
        <>
          {!loaded && (
            <div
              className="w-full animate-pulse"
              style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)" }}
            />
          )}
          <img
            src={`/pdf-pages/page-${pageNum}.png`}
            alt={`Company Profile — Page ${pageNum}`}
            onLoad={() => setLoaded(true)}
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              height: "auto",
              display: loaded ? "block" : "none",
            }}
          />

          {/* Clickable link overlay for pages 16, 17, 18 */}
          {link && loaded && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-20"
              style={{ cursor: "pointer" }}
              aria-label={`Visit ${link}`}
            />
          )}
        </>
      ) : (
        <div className="w-full" style={{ minHeight: "100vh", background: "#0a0a0a" }} />
      )}

      {pageNum < TOTAL_PAGES && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            background: "rgba(255,255,255,0.05)",
          }}
        />
      )}
    </section>
  );
}

function CompanyProfile() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "Lato, sans-serif" }}>
      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: `${scrollProgress}%`,
          background: "rgba(255,255,255,0.45)",
          zIndex: 9999,
          transition: "width 0.1s linear",
          pointerEvents: "none",
        }}
      />

      {/* All pages — full image, scrollable */}
      <div className="w-full" style={{ background: "#0a0a0a" }}>
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <motion.div
            key={i + 1}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PdfPage pageNum={i + 1} />
          </motion.div>
        ))}
      </div>

      <div
        className="w-full flex items-center justify-center py-16"
        style={{ background: "#0a0a0a" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          essentia
        </span>
      </div>
    </div>
  );
}

export default CompanyProfile;
