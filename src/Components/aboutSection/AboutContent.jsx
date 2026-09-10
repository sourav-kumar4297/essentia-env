import React, { useRef, useState, useEffect } from"react";
import { useScroll, useTransform, motion, useSpring } from"framer-motion";

const AboutContent = () => {
 const containerRef = useRef(null);
 const [isMobile, setIsMobile] = useState(false);

 // Screen size check for responsive parallax values
 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 // Scroll Tracking for the whole section
 const { scrollYProgress } = useScroll({
 target: containerRef,
 offset: ["start end","end start"],
 });

 // Smoothing the scroll values
 const smoothProgress = useSpring(scrollYProgress, {
 stiffness: 100,
 damping: 30,
 restDelta: 0.001
 });

 // Image Animations: Scaling and Y-axis movement
 const imageScale = useTransform(smoothProgress, [0.3, 0.7], [1.1, 1]);
 const imageY = useTransform(
 smoothProgress,
 [0.3, 1],
 isMobile ? ["0%","-5%"] : ["0%","-12%"]
 );

 // Text Animations: Subtle fade in and slide up based on scroll
 const textOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
 const textY = useTransform(smoothProgress, [0, 0.3], [50, 0]);

 return (
 <section
 ref={containerRef}
 className="bg-black text-white py-0 md:py-10 overflow-x-hidden"
 >
 <div className="w-full">

 {/* 1. Text Content Section - Responsive Lato Font */}
 <motion.div
 style={{ opacity: textOpacity, y: textY }}
 className="max-w-[1400px] mx-auto px-6 md:px-16 mb-12 md:mb-24"
 >
 <div className="max-w-8xl">
 {/* <h2 className="font-lato text-3xl md:text-4xl mb-5 font-light tracking-tight lowercase">
 about us
 
 </h2> */}

 <p className="font-lato text-sm md:text-[19px] leading-relaxed text-gray-300 font-light lowercase">
 essentia environments is a full service design and build firm specialising in turnkey residential and commercial projects. Every aspect, from concept and design to manufacturing, execution, and installation, is delivered through a single, integrated system.<br /> <br />
 With 26 years of experience, essentia brings together design expertise, technical depth, and in house production to ensure seamless coordination, absolute precision, and complete accountability at every stage, while also supporting larger project ecosystems through detailed coordination and backend integration.<br /> <br />
 The result is a fully managed, end to end experience where every detail is considered, every element is controlled, and every space is delivered exactly as envisioned.
 </p>
 </div>
 </motion.div>

 {/* 2. Full Width Parallax Image Section */}
 <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden">
 <motion.div
 style={{ scale: imageScale, y: imageY }}
 className="w-full h-[120%] absolute top-0 left-0 will-change-transform"
 >
 <img
 src="/AboutImgs/essentia-office.webp"
 alt="essentia architecture"
 className="w-full h-full object-cover object-top"
 />
 {/* Subtle Overlay to match your brand style */}
 <div className="absolute inset-0 bg-black/10"></div>
 </motion.div>
 </div>
 </div>
 </section>
 );
};

export default AboutContent;