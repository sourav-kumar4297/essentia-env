import React, { useState, useEffect } from"react";
import Button from"../Button";
import { motion, AnimatePresence } from"framer-motion";

const slides = [
 {
 id: 1,
 title:"Design. Build. Furniture.",
 image:"/HomeImgs/banner/banner1.webp",
 },
 {
 id: 2,
 title:"Integrated by design",
 image:"/HomeImgs/banner/banner2.webp",
 },
 // {
 // id: 5,
 // title:"interior",
 // image:"/HomeImgs/banner/banner5.webp",
 // },
 {
 id: 3,
 title:"Executed with precision",
 image:"/HomeImgs/banner/banner3.webp",
 },
 // {
 // id: 6,
 // title:"interior 2",
 // image:"/HomeImgs/banner/banner6.webp",
 // },
 {
 id: 4,
 title:"Concept to Completion",
 image:"/HomeImgs/banner/banner4.webp",
 },
 // {
 // id: 7,
 // title:"landscape",
 // image:"/HomeImgs/banner/banner7.webp",
 // },

];

const HeroSection = () => {
 const [current, setCurrent] = useState(0);
 const [isMobile, setIsMobile] = useState(false);

 // mobile detect (unchanged)
 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 // auto slide (unchanged)
 useEffect(() => {
 const timer = setInterval(() => {
 setCurrent((prev) => (prev + 1) % slides.length);
 }, 3000);
 return () => clearInterval(timer);
 }, []);

 // ✅ preload next images (desktop fix)
 useEffect(() => {
 slides.forEach((slide, index) => {
 if (index !== current) {
 const img = new Image();
 img.src = slide.image;
 }
 });
 }, [current]);

 return (
 <section className="relative w-full min-h-[80vh] md:h-screen overflow-hidden flex items-center">
 {/* Background Slider */}
 <AnimatePresence>
 <motion.img
 key={slides[current].id}
 src={slides[current].image}
 alt={slides[current].title}
 className="absolute inset-0 w-full h-full object-cover"
 initial={{ scale: 1.1, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 1.2, ease:"easeOut" }}
 loading="eager"
 fetchpriority="high"
 decoding="async"
 />
 </AnimatePresence>

 {/* Overlay (unchanged) */}
 <div className="absolute inset-0 bg-black/40" />

 {/* Content (unchanged) */}
 <div className="relative z-10 w-full -bottom-35 md:-bottom-20">
 <div className="w-full max-w-[1400px] mx-auto px-4 md:px-16">
 <div className="max-w-7xl mx-auto text-center md:text-left">
 <AnimatePresence mode="wait">
 <motion.h1
 key={slides[current].title}
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.8 }}
 className="font-light text-white text-[32px] md:text-[65px] leading-[1.2] md:leading-[1.1] tracking-tight mb-3 md:mb-5 lowercase max-w-[320px] md:max-w-[70%] mx-auto md:mx-0"
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
 size={isMobile ?"sm" :"md"}
 />
 </motion.div>
 </div>
 </div>
 </div>
 </section>
 );
};

export default HeroSection;
