import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";

const AboutSection = () => {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/HomeImgs/banner/banner1.webp",
      title: "Design. Build. Furniture.",
    },
    {
      id: 2,
      image: "/HomeImgs/banner/banner2.webp",
      title: "Integrated by design",
    },
    {
      id: 3,
      image: "/INTERIOR DESIGN/1.webp",
      title: "Executed with precision",
    },
    {
      id: 4,
        image: "/INTERIOR DESIGN/7.webp",
      title: "Concept to Completion",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 seconds hold

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-black py-10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Top Tagline */}
        <p className="w-full md:w-[80%] text-white/80 text-2xl md:text-3xl font-light italic mb-10 md:mb-16 tracking-wide lowercase">
          where visionary design, master craftsmanship, and thoughtful detail
          come together to shape extraordinary environments.
        </p>
      </div>

      {/* Full Width Left-to-Right Slider */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 mb-12 md:mb-20 overflow-hidden">
        <div
          className="flex h-[50vh] md:h-[90vh] transition-transform duration-1000 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 h-full"
              style={{ width: `${100 / slides.length}%` }}
            >
              <img
                src={slide.image}
                alt={`Banner ${slide.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dark Overlay (text readable banane ke liye) */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Animated Text + Button Overlay */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.h1
                key={slides[current].title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="font-light text-white text-[32px] md:text-[65px] leading-[1.2] md:leading-[1.1] tracking-tight lowercase max-w-[320px] md:max-w-[70%] mx-auto md:mx-0 mb-4 md:mb-6"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center md:justify-start"
            >
              <Button
                to="/contact"
                text="request a consultation"
                size={isMobile ? "sm" : "md"}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-white text-3xl md:text-5xl font-light tracking-tighter lowercase">
              about us
            </h2>
          </div>

          <div className="md:col-span-10">
            <p className="text-white/70 text-base md:text-xl font-light leading-relaxed text-left max-w-5xl lowercase">
              <strong className="text-white font-medium">
                essentia environments
              </strong>{" "}
              is a multidisciplinary design ecosystem delivering residential
              and commercial spaces from concept to completion. Founded in
              1999, the firm combines design intelligence, executional depth,
              and bespoke craftsmanship within a single seamless framework.
              Built on values of craftsmanship, longevity, and attention to
              detail, Essentia creates environments that reflect both global
              perspectives and indigenous sensibilities crafted with unwavering
              precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;