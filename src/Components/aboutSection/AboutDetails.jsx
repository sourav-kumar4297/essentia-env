import React, { useEffect, useRef } from"react";
import { motion, useMotionValue, useTransform, animate, useInView } from"framer-motion";

// --- Animated Counter Component ---
const Counter = ({ value, duration = 2 }) => {
 const count = useMotionValue(0);
 const rounded = useTransform(count, (latest) => Math.round(latest));
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true });

 useEffect(() => {
 if (isInView) {
 const controls = animate(count, value, { 
 duration: duration, 
 ease: [0.22, 1, 0.36, 1] 
 });
 return controls.stop;
 }
 }, [isInView, count, value, duration]);

 return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Fade-in Stagger Animations for Lists ---
const listVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.25, 
 delayChildren: 0.2, 
 },
 },
};

const itemVariants = {
 hidden: { opacity: 0 }, // Side ya up-down movement hata di hai
 visible: { 
 opacity: 1, 
 transition: { duration: 0.8, ease:"easeInOut" } 
 },
};

const AboutDetails = () => {
 const stats = [
 { number: 26, suffix:"+", label:"years of experience" },
 { number: 1000, suffix:"+", label:"projects delivered globally" },
 { number: 750, suffix:"+", label:"professionals" },
 ];

 const visionPoints = [
"To build lasting relationships with our clients by delivering thoughtful, value-driven design and build solutions for residential, commercial, and lifestyle environments.",
"To design and build spaces that are functional, enduring, and uncompromisingly refined bringing comfort, joy, and meaning to those who inhabit them.",
"To set new benchmarks in architecture and design by blending global sensibilities with Indian craftsmanship, innovation, and modern minimalism.",
"To shape holistic environments spanning architecture, interiors, landscapes, and built forms that inspire well-being, creativity, and a deeper connection between people and their surroundings.",
 ];

 const missionPoints = [
"To build lasting relationships with our clients by delivering thoughtful, value-driven design and build solutions for residential, commercial, and lifestyle environments.",
"To bring together architecture, interiors, landscapes, and turnkey execution through a multidisciplinary approach that ensures precision, quality, and excellence at every stage.",
"To prioritize sustainability through responsible design, mindful material choices, and practices that support long-term environmental well-being.",
"To foster a safe, supportive, and inspiring workplace for our employees, with a strong focus on career growth, continuous learning, collaboration, and long-term stability.",
 ];

 return (
 <section className="bg-black text-white py-8 md:py-10 overflow-hidden lowercase">
 <div className="max-w-[1400px] mx-auto px-6 md:px-16">
 
 {/* --- 1. Vision & Mission Section --- */}
 <div className="flex flex-col gap-24 md:gap-0">
 
 {/* Our Vision Row */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start -mb-5 md:mb-10">
 {/* Vision Image - Smooth Pop Up */}
 <motion.div 
 initial={{ opacity: 0, scale: 0.85 }} 
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Premium smooth curve
 className="w-full aspect-[4/4] md:aspect-[4/3] m-auto"
 >
 <img 
 src="/AboutImgs/mission.webp" 
 alt="Architectural Vision" 
 className="w-full h-full object-contain object-center opacity-80 hover:opacity-100 transition-opacity duration-1000"
 />
 </motion.div>

 {/* Vision Text - Simple Fade In */}
 <motion.div 
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 0.8 }}
 className="md:pt-20 lg:pl-10"
 >
 <h3 className="font-lato text-3xl md:text-4xl font-light mb-6 lowercase tracking-[0.1em] text-white/90">
 our vision
 </h3>
 
 {/* Animated Vision List */}
 <motion.ul 
 variants={listVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin:"-50px" }}
 className="space-y-3 max-w-3xl font-lato lowercase"
 >
 {visionPoints.map((item, i) => (
 <motion.li 
 key={i} 
 variants={itemVariants}
 className="flex gap-4 text-gray-400 text-sm md:text-lg font-light leading-snug"
 >
 <span className="text-[#ffffff] mt-1">•</span>
 <span>{item}</span>
 </motion.li>
 ))}
 </motion.ul>
 </motion.div>
 </div>

 {/* Our Mission Row */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
 {/* Mission Text - Simple Fade In */}
 <motion.div 
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 0.8 }}
 className="order-2 md:order-1 md:pb-20"
 >
 <h3 className="font-lato text-3xl md:text-4xl font-light mb-8 lowercase tracking-[0.1em] text-white/90">
 our mission
 </h3>
 
 {/* Animated Mission List */}
 <motion.ul 
 variants={listVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin:"-50px" }}
 className="space-y-3 max-w-3xl font-lato lowercase"
 >
 {missionPoints.map((item, i) => (
 <motion.li 
 key={i} 
 variants={itemVariants}
 className="flex gap-4 text-gray-400 text-sm md:text-lg font-light leading-snug"
 >
 <span className="text-[#ffffff] mt-1">•</span>
 <span>{item}</span>
 </motion.li>
 ))}
 </motion.ul>
 </motion.div>

 {/* Mission Image - Smooth Pop Up */}
 <motion.div 
 initial={{ opacity: 0, scale: 0.85 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true, margin:"-100px" }}
 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
 className="order-1 md:order-2 w-full aspect-[4/3] m-auto"
 >
 <img 
 src="/AboutImgs/vision-wireframe.webp" 
 alt="Project Mission" 
 className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-1000"
 />
 </motion.div>
 </div>
 </div>

 {/* --- 2. Animated Stats Section --- */}
 <div className="mt-10 py-10 border-t border-b border-white/10">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center text-center">
 
 <div className="lg:col-span-4">
 <h2 className="font-lato text-2xl text-center md:text-left md:text-4xl font-extralight leading-tight lowercase">
 Our stand-out stats in 2025<br />
 </h2>
 </div>

 <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
 {stats.map((stat, index) => (
 <div key={index} className="group flex flex-col items-center justify-center">
 <div className="text-5xl md:text-7xl font-lato font-light mb-3 transition-colors duration-500 flex items-baseline">
 <Counter value={stat.number} />
 <span className="text-[#ffffff]">{stat.suffix}</span>
 </div>
 <div className="text-gray-400 font-lato text-sm lowercase tracking-[0.25em] leading-tight">
 {stat.label}
 </div>
 </div>
 ))}
 </div>

 </div>
 </div>

 </div>
 </section>
 );
};

export default AboutDetails;