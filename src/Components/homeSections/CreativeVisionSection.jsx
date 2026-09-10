import React, { useRef } from"react";
import { motion, useScroll, useTransform, useSpring } from"framer-motion";

const CreativeVisionSection = () => {
 // Reference for the section to track scroll
 const containerRef = useRef(null);

 // Track vertical scroll progress inside this container
 const { scrollYProgress } = useScroll({
 target: containerRef,
 // FIX: Animation tab start hogi jab image ka Top screen ke 85% par hoga (niche)
 // aur tab khatam hogi jab image ka Center screen ke 50% (beecho-beech) aayega.
 offset: ["start 85%","center 50%"] 
 });

 // OPTIONAL LIFT: Scroll progress ko spring de diya taaki jhatke na lage
 const smoothProgress = useSpring(scrollYProgress, {
 stiffness: 100,
 damping: 30,
 restDelta: 0.001
 });

 // 1. Clip-path effect: Right side se mask ko 100% se 0% tak kam karna (Left to Right reveal)
 const clipPath = useTransform(smoothProgress, [0, 1], ["inset(0 100% 0 0)","inset(0 0% 0 0)"]);
 
 // 2. Slight opacity fade-in for smoothness
 const opacity = useTransform(smoothProgress, [0, 0.2, 1], [0.3, 1, 1]);

 return (
 <section className="relative z-[1] w-full bg-black py-10 md:py-20 overflow-hidden font-lato">
 <div className="w-full mx-auto flex flex-col items-center">
 
 {/* Top Welcome Text */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="max-w-5xl text-center mb-16 px-6"
 >
 <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed tracking-wide lowercase">
 Every project is conceived, executed, and crafted in-house, ensuring continuity, refinement, and a signature sense of timeless character. 
 </p>
 </motion.div>

 {/* Main Illustration/Image Container with Scroll Ref */}
 <div ref={containerRef} className="relative w-full mx-auto px-4 md:px-0 flex justify-center">
 
 {/* Background Faint Image (Optional: Agar aap chahte ho ki faint sketch pehle se dikhe) */}
 <img
 src="/HomeImgs/home-sk.webp"
 alt="Architectural Vision Outline"
 className="absolute w-full h-full object-contain opacity-10"
 loading="lazy"
 />

 {/* Animated Drawing/Reveal Image */}
 <motion.img
 src="/HomeImgs/home-sk.webp"
 alt="Architectural Vision"
 className="relative w-full object-contain"
 style={{ 
 clipPath, // Framer motion isko automatically apply karega scroll ke saath
 opacity 
 }}
 loading="lazy"
 decoding="async"
 />
 </div>
 </div>
 </section>
 );
};

export default CreativeVisionSection;