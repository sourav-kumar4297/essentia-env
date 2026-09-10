import React, { useState, useEffect, useCallback, useRef } from"react";
import { motion, animate, useMotionValue } from"framer-motion";
import { ChevronLeft, ChevronRight } from"lucide-react";
import { Link } from"react-router-dom";

// Aapka actual blog data import karein
import { blogPosts } from"../../Components/bloagSection/blogData";

const JournalSection = () => {
 // Mobile state
 const [currentSlide, setCurrentSlide] = useState(0);
 const [isMobile, setIsMobile] = useState(false);
 const autoSlideRef = useRef(null);

 // Mobile detect
 useEffect(() => {
 const checkMobile = () => {
 setIsMobile(window.innerWidth < 768);
 };
 checkMobile();
 window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
 }, []);

 // Mobile auto-slide (chalta rahega)
 useEffect(() => {
 if (!isMobile) return;

 autoSlideRef.current = setInterval(() => {
 setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
 }, 3000);

 return () => {
 if (autoSlideRef.current) {
 clearInterval(autoSlideRef.current);
 }
 };
 }, [isMobile]);

 // Drag/Swipe logic 
 const onDragEnd = (_, info) => {
 const swipePower = Math.abs(info.offset.x) * info.velocity.x;
 if (swipePower < -500 && currentSlide < blogPosts.length - 1) {
 setCurrentSlide(s => s + 1);
 } else if (swipePower > 500 && currentSlide > 0) {
 setCurrentSlide(s => s - 1);
 }
 };

 // ================= DESKTOP CODE =================
 const SLIDE_ITEMS = [...blogPosts, ...blogPosts, ...blogPosts];
 const CARD_WIDTH_PERCENT = 25;
 const [visualIndex, setVisualIndex] = useState(blogPosts.length);
 const x = useMotionValue(0);
 const isAnimating = useRef(false);

 useEffect(() => {
 if (!isMobile) {
 x.set(`-${blogPosts.length * CARD_WIDTH_PERCENT}%`);
 }
 }, [x, isMobile, blogPosts.length]);

 const moveTo = useCallback((targetIndex) => {
 if (isMobile || isAnimating.current) return;
 isAnimating.current = true;

 const targetX = -(targetIndex * CARD_WIDTH_PERCENT);
 setVisualIndex(targetIndex);

 animate(x,`${targetX}%`, {
 duration: 0.8,
 ease: [0.32, 0.72, 0, 1],
 onComplete: () => {
 isAnimating.current = false;

 if (targetIndex >= blogPosts.length * 2) {
 x.jump(`-${blogPosts.length * CARD_WIDTH_PERCENT}%`);
 setVisualIndex(blogPosts.length);
 } else if (targetIndex <= blogPosts.length - 1) {
 x.jump(`-${(blogPosts.length * 2 - 1) * CARD_WIDTH_PERCENT}%`);
 setVisualIndex(blogPosts.length * 2 - 1);
 }
 }
 });
 }, [x, isMobile, blogPosts.length]);

 const handleDesktopNext = useCallback(() => {
 if (!isMobile) moveTo(visualIndex + 1);
 }, [visualIndex, moveTo, isMobile]);

 const handleDesktopPrev = useCallback(() => {
 if (!isMobile) moveTo(visualIndex - 1);
 }, [visualIndex, moveTo, isMobile]);

 // Desktop auto-play
 useEffect(() => {
 if (isMobile) return;
 const timer = setInterval(handleDesktopNext, 3000);
 return () => clearInterval(timer);
 }, [handleDesktopNext, isMobile]);

 return (
 <section className="bg-black text-white py-10 overflow-hidden w-full font-lato">
 {/* Header */}
 <div className="max-w-[1400px] mx-auto px-4 md:px-2 mb-12 flex justify-between items-end">
 <h2 className="text-white text-3xl md:text-5xl font-light lowercase">blogs</h2>
 <Link to="/blogs" >
 <button className="text-zinc-500 cursor-pointer hover:text-white transition-colors text-sm md:text-lg lowercase tracking-wider">view all</button>
 </Link>
 </div>

 {/* ================= DESKTOP VIEW ================= */}
 <div className="hidden md:block relative w-full">
 <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
 <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

 <div className="flex justify-center items-center overflow-visible w-full">
 <motion.div className="flex w-full" style={{ x }}>
 {SLIDE_ITEMS.map((item, i) => {
 const isMiddle = i === visualIndex + 1 || i === visualIndex + 2;

 return (
 <div
 key={i}
 className={`relative shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] px-3
 ${isMiddle ?"opacity-100 blur-0 scale-100" :"opacity-20 blur-[6px] scale-90"}`}
 style={{ flex:`0 0 25%` }}
 >
 <Link to={`/blogs/${item.slug}`} className="block group cursor-pointer">
 <div className="aspect-square overflow-hidden bg-zinc-900 mb-6 transition-all duration-1000 lowercase">
 <img
 src={item.image}
 alt={item.title}
 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
 loading="lazy"
 decoding="async"
 />
 </div>
 <div className={`h-24 transition-opacity duration-700 ${isMiddle ?"opacity-100" :"opacity-0"}`}>
 <p className="text-[13px] lowercase tracking-widest text-zinc-500 mb-2">
 {item.category}
 </p>
 <p className="text-[13px] md:text-[14px] text-zinc-300 leading-relaxed font-light line-clamp-2 text-center md:text-left lowercase">
 {item.title}
 </p>
 </div>
 </Link>
 </div>
 );
 })}
 </motion.div>
 </div>

 {/* Desktop Navigation */}
 <div className="flex justify-center gap-6 mt-0 relative z-30">
 <button onClick={handleDesktopPrev} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 active:scale-90">
 <ChevronLeft size={24} strokeWidth={1.5} />
 </button>
 <button onClick={handleDesktopNext} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 active:scale-90">
 <ChevronRight size={24} strokeWidth={1.5} />
 </button>
 </div>
 </div>

 {/* ================= MOBILE VIEW ================= */}
 <div className="md:hidden overflow-hidden">

 {/* Animated Carousel (Swipe/Drag Effect) */}
 <motion.div
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={onDragEnd}
 animate={{ x:`calc(-${currentSlide * 86}% - ${currentSlide * 1}rem)` }}
 style={{ marginLeft:"7.5%" }}
 transition={{ type:"spring", stiffness: 300, damping: 30 }}
 className="flex cursor-grab active:cursor-grabbing"
 >
 {blogPosts.map((post, index) => (
 <motion.div
 key={index}
 className="w-[91%] flex-shrink-0 pr-4"
 animate={{
 scale: currentSlide === index ? 1 : 0.9,
 opacity: currentSlide === index ? 1 : 0.4,
 }}
 transition={{ duration: 0.4 }}
 >
 <Link to={`/blogs/${post.slug}`} className="block relative aspect-square w-full h-[60vh] overflow-hidden bg-zinc-900 rounded-2xl">
 <img
 src={post.image}
 alt={post.title}
 loading={currentSlide === index ?"eager" :"lazy"}
 decoding="async"
 className="w-full h-full object-cover"
 />

 {/* Minimal Centered Text Overlay */}
 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 pb-6 px-6 pointer-events-none flex flex-col items-start justify-start z-10">
 <h3 className="text-white text-[17px] font-light lowercase line-clamp-2 text-start leading-snug shadow-sm">
 {post.category}
 </h3>
 <p className="text-[13px] md:text-[13px] text-zinc-400 leading-relaxed font-light line-clamp-2 text-start md:text-left lowercase">
 {post.title}
 </p>
 </div>
 </Link>
 </motion.div>
 ))}
 </motion.div>

 {/* Simple Slider Dots (Replaced Wheel & Arrows) */}
 <div className="mt-8 mb-4 flex justify-center gap-2">
 {blogPosts.map((_, i) => (
 <motion.div
 key={i}
 className="h-1 bg-white rounded-full"
 animate={{
 width: currentSlide === i ? 32 : 8,
 opacity: currentSlide === i ? 1 : 0.3,
 }}
 transition={{ duration: 0.3 }}
 />
 ))}
 </div>

 </div>
 </section>
 );
};

export default JournalSection;