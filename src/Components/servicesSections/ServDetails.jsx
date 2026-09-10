import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ServDetails = () => {
  const services = [
    "architecture",
    "interior design",
    "landscape design",
    "design to build execution",
  ];

  // 1. Fixed: useRef added and imported
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Screen size check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Tracking for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smoothing the scroll values
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Text Animations: Subtle fade in and slide up based on scroll
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(smoothProgress, [0, 0.3], [50, 0]);

  return (
    // 2. Fixed: ref={containerRef} attached to the section
    <section ref={containerRef} className="bg-black text-white py-10 md:py-16 font-lato overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">

        {/* Top Description with Scroll-based Animation */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-[1400px]"
        >
          <p className="text-base md:text-xl leading-relaxed text-zinc-400 font-light lowercase">
            An integrated offering across design, build, and furniture, delivering full service turnkey solutions for residential and commercial projects globally. Every aspect, from planning to final detailing, is handled in-house, ensuring consistency, coordination, and a seamless end to end project experience.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServDetails;