import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mediaPosts } from './mediaData';
import Button from '../Button';

const MediaCard = () => {
 const [isMobile, setIsMobile] = useState(false);

 // SOLVED: Yahan sirf slice(1) likhna hai. 
 // Ye 1st index (dusri post) se lekar end tak saara data utha lega.
 const otherPosts = mediaPosts.slice(0);

 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
 }, []);

 const containerVariants = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
 };

 const itemVariants = {
 hidden: { opacity: 0, y: 40 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
 }
 };

 return (
 <section className="bg-black py-10 px-6 md:px-16 font-lato">
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="max-w-[1400px] mx-auto"
 >
 {/* Header */}
 <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4 lowercase">
 <div className="flex flex-wrap items-baseline gap-4 md:gap-8">
 <p className="text-zinc-500 italic font-light tracking-wide text-sm md:text-xl">
 Ideas, Interiors, Insight, & Innovation.
 </p>
 </div>
 <p className="text-zinc-400 font-light max-w-sm text-sm md:text-xl md:text-right leading-relaxed">
 A closer look into our design world featuring tips, trends, and transformations.
 </p>
 </div>

 {/* Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
 {otherPosts.map((blog) => (
 <motion.div
 key={blog.id}
 variants={itemVariants}
 className="group relative aspect-[4/5] overflow-hidden bg-zinc-900"
 >
 <Link to={`/media/${blog.slug}`} className="block w-full h-full">
 {/* Image - Smooth Grayscale or deliberate slow scale zoom */}
 <img
 src={blog.image}
 alt={blog.title}
 className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
 />

 {/* Bottom Glass Box - Optimized glass look and smoother transition */}
 <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-10">
 <div className="
 backdrop-blur-md bg-white/10 border border-white/20 rounded-md
 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
 p-4 md:p-6
 transition-all duration-500 ease-in-out
 group-hover:pb-8 group-hover:bg-white/15
">
 <div className="flex flex-col items-center text-center gap-3">
 {/* <span className="text-white border border-white/40 px-3 py-1 text-[8px] md:text-[10px] lowercase tracking-[0.2em]">
 {blog.category}
 </span> */}

 <h3 className="text-white font-light text-xs md:text-sm lg:text-lg tracking-widest lowercase line-clamp-2">
 {blog.title}
 </h3>

 {/* Hidden button → appears on hover (Standardized smoothness) */}
 <div className="overflow-hidden">
 <div
 className="
 max-h-0 opacity-0 translate-y-2
 transition-all duration-500 ease-in-out
 group-hover:max-h-20 group-hover:opacity-100 group-hover:translate-y-0
"
 >
 <Button
 to={`/media/${blog.slug}`}
 text="read more"
 size={isMobile ?"sm" :"sm"}
 />
 </div>
 </div>
 </div>
 </div>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </section>
 );
};

export default MediaCard;