import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { mediaPosts, getRelatedPosts } from './mediaData';
import PageHeroSection from '../PageHeroSection';

// Animations
const fadeUp = {
 hidden: { opacity: 0, y: 24 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
 }
};

const fade = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { duration: 1 }
 }
};

// Helper Component for the Card
const RelatedCard = ({ item }) => (
 <Link to={`/media/${item.slug}`} className="group block h-full">
 <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden rounded-sm">
 <img
 src={item.image}
 alt={item.title}
 className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 ease-out"
 />
 <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black via-black/20 to-transparent">
 {/* <span className="text-[12px] border border-white/20 w-fit px-3 py-1 mb-3 lowercase tracking-widest text-zinc-300">
 {item.category}
 </span> */}
 <p className="text-lg md:text-xl font-light lowercase leading-tight group-hover:text-white transition-colors">
 {item.title}
 </p>
 </div>
 </div>
 </Link>
);

const MediaDetailPage = () => {
 const { slug } = useParams();
 const article = mediaPosts.find((item) => item.slug === slug);
 
 // States
 const [currentSlide, setCurrentSlide] = useState(0);
 const [isMobile, setIsMobile] = useState(false);
 const [selectedIndex, setSelectedIndex] = useState(null); 

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: 'instant' });
 
 const checkMobile = () => {
 const mobile = window.innerWidth < 768;
 setIsMobile(mobile);
 if (!mobile) setCurrentSlide(0);
 };
 
 checkMobile();
 window.addEventListener('resize', checkMobile);
 return () => window.removeEventListener('resize', checkMobile);
 }, [slug]);

 // Lock scrolling jab popup open ho
 useEffect(() => {
 if (selectedIndex !== null) {
 document.body.style.overflow = 'hidden';
 } else {
 document.body.style.overflow = 'auto';
 }
 return () => { document.body.style.overflow = 'auto'; };
 }, [selectedIndex]);

 // Keyboard navigation logic
 useEffect(() => {
 const handleKeyDown = (e) => {
 if (selectedIndex === null) return;
 if (e.key === 'Escape') setSelectedIndex(null);
 if (e.key === 'ArrowRight') nextImage();
 if (e.key === 'ArrowLeft') prevImage();
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, [selectedIndex]);

 const relatedPosts = getRelatedPosts(article?.id, 3); // Get related posts based on current article

 // Mobile Swipe Logic for Slider
 const onDragEnd = (event, info) => {
 const swipeThreshold = 50;
 const swipeVelocity = 500;
 const offset = info.offset.x;
 const velocity = info.velocity.x;

 if (offset < -swipeThreshold || velocity < -swipeVelocity) {
 if (currentSlide < relatedPosts.length - 1) setCurrentSlide(s => s + 1);
 } else if (offset > swipeThreshold || velocity > swipeVelocity) {
 if (currentSlide > 0) setCurrentSlide(s => s - 1);
 }
 };

 // Next aur Prev functions
 const nextImage = () => {
 if (!article?.sectionImages) return;
 setSelectedIndex((prev) => (prev + 1) % article.sectionImages.length);
 };

 const prevImage = () => {
 if (!article?.sectionImages) return;
 setSelectedIndex((prev) => (prev === 0 ? article.sectionImages.length - 1 : prev - 1));
 };

 if (!article) {
 return (
 <div className="text-white bg-black h-screen flex flex-col items-center justify-center gap-4 lowercase tracking-widest font-light">
 <p>Article not found</p>
 <Link to="/media" className="text-zinc-500 text-xs underline">back to all blogs</Link>
 </div>
 );
 }

 return (
 <AnimatePresence mode="wait">
 <main key={slug} className="bg-black text-white font-lato min-h-screen relative">
 
 {/* ================= HERO SECTION ================= */}
 <PageHeroSection
 image={article.heroImg}
 title={article.title}
 category={article.category ||"PR Release"}
 titleSize="text-5xl md:text-[80px] lg:text-[90px]"
 />

 {/* ================= CONTENT & 1ST IMAGE (Tall) ================= */}
 <section className="max-w-[1400px] mx-auto py-16 px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 {article.sectionImages && article.sectionImages.length > 0 && (
 <motion.div
 variants={fade}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="aspect-[3/4] md:aspect-[4/5] bg-zinc-900 overflow-hidden w-full lg:w-[85%] mx-auto cursor-zoom-in"
 onClick={() => setSelectedIndex(0)} // Pehli image ka index 0
 >
 <motion.img
 src={article.sectionImages[0]}
 alt="PR Content 1"
 initial={{ scale: 1.08 }}
 whileInView={{ scale: 1 }}
 transition={{ duration: 1.2, ease:"easeOut" }}
 className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
 />
 </motion.div>
 )}

 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="text-zinc-400 lowercase h-full flex justify-center items-center bg-zinc-900/50 p-8 md:p-12 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line"
 >
 {article.description}
 </motion.div>
 </section>

 {/* ================= DYNAMIC IMAGE GRID ================= */}
 {article.sectionImages && article.sectionImages.length > 1 && (
 <section className="max-w-[1400px] mx-auto px-6 md:px-16 mb-20">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
 {article.sectionImages.slice(1).map((imgUrl, index) => (
 <motion.div
 key={index}
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-zoom-in relative"
 onClick={() => setSelectedIndex(index + 1)} // Grid wali images ka index +1 hoga
 >
 <motion.img
 src={imgUrl}
 alt={`PR Details ${index + 2}`}
 initial={{ scale: 1.05 }}
 whileInView={{ scale: 1 }}
 transition={{ duration: 1.3, ease:"easeOut" }}
 className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
 />
 </motion.div>
 ))}
 </div>
 </section>
 )}

 {/* ================= RELATED POSTS (WITH MOBILE SLIDER) ================= */}
 <section className="max-w-[1400px] mx-auto py-20 border-t border-zinc-900/50 overflow-hidden">
 <div className="px-6 md:px-16 mb-12 flex justify-between items-end">
 <div>
 <h4 className="text-zinc-500 italic text-xs lowercase tracking-[0.2em]">other press release</h4>
 <h2 className="text-2xl md:text-3xl font-light lowercase mt-2">recent media</h2>
 </div>
 {/* Desktop Counter */}
 <div className="hidden md:block text-zinc-600 font-mono text-xs">
 01 — {relatedPosts.length.toString().padStart(2, '0')}
 </div>
 </div>

 <div className="relative">
 {/* Desktop View */}
 <div className="hidden md:grid grid-cols-3 gap-10 px-16">
 {relatedPosts.map((item) => (
 <motion.div key={item.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
 <RelatedCard item={item} />
 </motion.div>
 ))}
 </div>

 {/* Mobile View (Premium Slider) */}
 <div className="md:hidden">
 <motion.div
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.2}
 onDragEnd={onDragEnd}
 animate={{ x:`calc(-${currentSlide * 82}% )` }}
 style={{ marginLeft:"9%", width:"100%" }}
 transition={{ type:"spring", stiffness: 200, damping: 25 }}
 className="flex cursor-grab active:cursor-grabbing"
 >
 {relatedPosts.map((item, index) => (
 <motion.div
 key={item.id}
 className="w-[82%] flex-shrink-0 pr-5"
 animate={{ 
 opacity: currentSlide === index ? 1 : 0.3,
 scale: currentSlide === index ? 1 : 0.92 
 }}
 transition={{ duration: 0.4 }}
 >
 <RelatedCard item={item} />
 </motion.div>
 ))}
 </motion.div>

 {/* Mobile Progress Bar */}
 <div className="flex flex-col items-center gap-4 mt-10">
 <div className="flex gap-2">
 {relatedPosts.map((_, i) => (
 <motion.div
 key={i}
 className="h-[2px] bg-white"
 animate={{ 
 width: currentSlide === i ? 30 : 8,
 opacity: currentSlide === i ? 1 : 0.2 
 }}
 />
 ))}
 </div>
 {/* <span className="text-[9px] lowercase tracking-[0.3em] text-zinc-600">swipe</span> */}
 </div>
 </div>
 </div>
 </section>

 {/* ================= IMAGE POPUP (LIGHTBOX WITH ARROWS) ================= */}
 <AnimatePresence>
 {selectedIndex !== null && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
 onClick={() => setSelectedIndex(null)} 
 >
 <button 
 className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors p-2 z-50 bg-white/10 rounded-full"
 onClick={() => setSelectedIndex(null)}
 >
 <X size={28} strokeWidth={1.5} />
 </button>

 <button 
 className="absolute left-4 md:left-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50"
 onClick={(e) => { e.stopPropagation(); prevImage(); }}
 >
 <ChevronLeft size={32} />
 </button>

 <motion.div
 key={selectedIndex}
 initial={{ scale: 0.9, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.9, opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="relative max-w-full max-h-[85vh] flex flex-col items-center"
 onClick={(e) => e.stopPropagation()} 
 >
 <img
 src={article.sectionImages[selectedIndex]}
 alt="Enlarged PR"
 className="max-w-full max-h-[80vh] object-contain cursor-default shadow-2xl rounded-sm"
 />
 
 <p className="text-white/50 text-xs md:text-sm tracking-widest font-light mt-6 lowercase">
 image {selectedIndex + 1} of {article.sectionImages.length}
 </p>
 </motion.div>

 <button 
 className="absolute right-4 md:right-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50"
 onClick={(e) => { e.stopPropagation(); nextImage(); }}
 >
 <ChevronRight size={32} />
 </button>

 </motion.div>
 )}
 </AnimatePresence>

 </main>
 </AnimatePresence>
 );
};

export default MediaDetailPage;