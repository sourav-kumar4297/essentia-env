// import React, { useState, useEffect, useRef } from"react";
// import { motion, AnimatePresence } from"framer-motion";
// import { Link, useNavigate } from"react-router-dom";
// import Button from"../Button";

// const ProjectsSection = () => {
// const projectData = [
// { id: 1, title:"parvsa", img:"/HomeImgs/Proj/pro1.webp", link:"/projects/parvsa", desc:"Lorem ipsum dolor sit amet consectetur. Congue ut euismod pellentesque vestibulum nulla tristique fames tempus tincidunt." },
// { id: 2, title:"mehrotra", img:"/HomeImgs/Proj/pro2.webp", link:"/projects/mehrotra", desc:"In dictum donec parturient consectetur quis ut dolor in congue. Morbi vel dui aliquam tortor magna ultrices arcu." },
// { id: 3, title:"leeford clinic", img:"/HomeImgs/Proj/pro3.webp", link:"/projects/leeford-clinic", desc:"Media and space integration focused on minimalist architecture and desert landscapes." },
// { id: 4, title:"goel residence", img:"/HomeImgs/Proj/pro4.webp", link:"/projects/goel-residence", desc:"Contemporary living spaces designed for high-density urban environments with a focus on natural light." },
// { id: 5, title:"kowori", img:"/HomeImgs/Proj/pro5.webp", link:"/projects/kowori", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
// { id: 6, title:"panchseel", img:"/HomeImgs/Proj/pro6.webp", link:"/projects/panchseel", desc:"Restoring historical architecture with modern amenities, preserving the soul of the past." },
// ];

// const [currentSlide, setCurrentSlide] = useState(0);
// const [isMobile, setIsMobile] = useState(false);
// const navigate = useNavigate();
// const containerRef = useRef(null);

// /* ✅ Mobile detect */
// useEffect(() => {
// const checkMobile = () => setIsMobile(window.innerWidth < 768);
// checkMobile();
// window.addEventListener("resize", checkMobile);
// return () => window.removeEventListener("resize", checkMobile);
// }, []);

// /* ✅ Preload first image */
// useEffect(() => {
// const link = document.createElement("link");
// link.rel ="preload";
// link.as ="image";
// link.href = projectData[0].img;
// link.type ="image/webp";
// document.head.appendChild(link);

// return () => document.head.removeChild(link);
// }, []);

// /* ✅ Swipe logic */
// const onDragEnd = (_, info) => {
// const swipePower = Math.abs(info.offset.x) * info.velocity.x;
// if (swipePower < -600 && currentSlide < projectData.length - 1) {
// setCurrentSlide(s => s + 1);
// } else if (swipePower > 600 && currentSlide > 0) {
// setCurrentSlide(s => s - 1);
// }
// };

// return (
// <section className="w-full bg-black py-10 px-4 md:px-16 overflow-hidden">
// <div className="max-w-[1400px] mx-auto">

// {/* <h2 className="text-white text-3xl md:text-5xl font-light lowercase mb-12">
// projects
// </h2> */}
// <div className="max-w-[1400px] mx-auto px-6 mb-12 flex justify-between items-end">
// <h2 className="text-white text-3xl md:text-5xl font-light lowercase">projects</h2>
// <Link to="/projects" >
// <button className="text-zinc-500 cursor-pointer hover:text-white transition-colors text-sm md:text-lg lowercase tracking-wider">view all</button>
// </Link>
// </div>

// {/* ================= DESKTOP GRID ================= */}
// <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
// {projectData.map(project => (
// <div key={project.id} className="group cursor-pointer">
// <div className="relative aspect-square overflow-hidden bg-[#0a0a0a] transition-all duration-1000">
// <img
// src={project.img}
// alt={project.title}
// loading="lazy"
// decoding="async"
// fetchpriority="low"
// width="600"
// height="600"
// className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
// />
// <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8">
// <p className="text-white text-sm text-center mb-6">
// {project.desc}
// </p>
// <Button to={project.link} text="read more" size="sm" />
// </div>
// </div>
// <h3 className="mt-4 text-white/60 group-hover:text-white transition lowercase">
// {project.title}
// </h3>
// </div>
// ))}
// </div>

// {/* ================= MOBILE SLIDER ================= */}
// <div className="md:hidden relative" ref={containerRef}>
// <motion.div
// drag="x"
// dragConstraints={{ left: 0, right: 0 }}
// dragElastic={0.2}
// onDragEnd={onDragEnd}
// animate={{ x:`calc(-${currentSlide * 85}% - ${currentSlide * 1}rem)` }}
// style={{ marginLeft:"7.5%" }}
// transition={{ type:"spring", stiffness: 300, damping: 30 }}
// className="flex cursor-grab active:cursor-grabbing"
// >
// {projectData.map((project, index) => (
// <motion.div
// key={project.id}
// className="w-[91%] flex-shrink-0 pr-4"
// animate={{
// scale: currentSlide === index ? 1 : 0.9,
// opacity: currentSlide === index ? 1 : 0.4,
// }}
// transition={{ duration: 0.4 }}
// >
// <div
// onClick={() => navigate(project.link)}
// className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0a0a0a]"
// >
// <img
// src={project.img}
// alt={project.title}
// loading={currentSlide === index ?"eager" :"lazy"}
// decoding="async"
// fetchpriority={currentSlide === index ?"high" :"low"}
// width="400"
// height="500"
// className="w-full h-full object-cover"
// />

// <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6">
// <h3 className="text-white text-xl lowercase">
// {project.title}
// </h3>
// </div>
// </div>
// </motion.div>
// ))}
// </motion.div>

// {/* Slider dots */}
// <div className="mt-10 flex justify-center gap-2">
// {projectData.map((_, i) => (
// <motion.div
// key={i}
// className="h-1 bg-white rounded-full"
// animate={{
// width: currentSlide === i ? 32 : 8,
// opacity: currentSlide === i ? 1 : 0.3,
// }}
// />
// ))}
// </div>
// </div>

// {/* Footer button */}
// {/* <div className="mt-14 flex justify-center">
// <Button
// to="/projects"
// text="view all projects"
// size={isMobile ?"sm" :"md"}
// />
// </div> */}

// </div>
// </section>
// );
// };

// export default ProjectsSection;







import React, { useState, useEffect, useRef, useCallback } from"react";
import { motion, AnimatePresence } from"framer-motion";
import { Link, useNavigate } from"react-router-dom";
import { ChevronLeft, ChevronRight } from"lucide-react";
import Button from"../Button";

const ProjectsSection = () => {
 const projectData = [
 { id: 1, title:"indore residence", img:"/HomeImgs/Proj/indore-card_result.webp", link:"/projects/saota-indore", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
 { id: 2, title:"hyderabad residence", img:"/HomeImgs/Proj/hyder-card_result.webp", link:"/projects/hyderabad", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
 { id: 3, title:"kenya residence", img:"/HomeImgs/Proj/kenya-card_result.webp", link:"/projects/kenya-residence", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
 // { id: 3, title:"delhi residence", img:"/HomeImgs/Proj/pro8.webp", link:"/projects/maharani-bagh-delhi", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
 { id: 4, title:"aura sales gallery", img:"/HomeImgs/Proj/aura-card_result.webp", link:"/projects/aura-sales-gallery", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
 { id: 5, title:"kowori residence", img:"/HomeImgs/Proj/kowari-card_result.webp", link:"/projects/kowori-residence", desc:"A creative sanctuary that explores the intersection of raw concrete and warm timber textures." },
 { id: 6, title:"dubai residence", img:"/HomeImgs/Proj/dubai-card_result.webp", link:"/projects/dubai-residence", desc:"Lorem ipsum dolor sit amet consectetur. Congue ut euismod pellentesque vestibulum nulla tristique fames tempus tincidunt." },
 // { id: 6, title:"delhi residence", img:"/HomeImgs/Proj/pro1.webp", link:"/projects/parvsa", desc:"Lorem ipsum dolor sit amet consectetur. Congue ut euismod pellentesque vestibulum nulla tristique fames tempus tincidunt." },
 ];

 const [currentSlide, setCurrentSlide] = useState(0);
 const [isMobile, setIsMobile] = useState(false);
 const [touchStartX, setTouchStartX] = useState(null);
 const [touchEndX, setTouchEndX] = useState(null);

 const navigate = useNavigate();
 const autoSlideRef = useRef(null);

 /* ✅ Mobile detect */
 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 /* ✅ Preload first image */
 useEffect(() => {
 const link = document.createElement("link");
 link.rel ="preload";
 link.as ="image";
 link.href = projectData[0].img;
 link.type ="image/webp";
 document.head.appendChild(link);

 return () => document.head.removeChild(link);
 }, [projectData]);

 /* ✅ Mobile auto-slide */
 useEffect(() => {
 if (!isMobile) return;

 autoSlideRef.current = setInterval(() => {
 setCurrentSlide((prev) => (prev + 1) % projectData.length);
 }, 3000);

 return () => {
 if (autoSlideRef.current) clearInterval(autoSlideRef.current);
 };
 }, [isMobile, projectData.length]);

 /* ✅ Mobile touch handlers */
 const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
 const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);

 const handleTouchEnd = () => {
 if (!touchStartX || !touchEndX) return;

 const distance = touchStartX - touchEndX;
 const minSwipeDistance = 50;

 if (Math.abs(distance) > minSwipeDistance) {
 if (distance > 0) handleNext();
 else handlePrev();
 }
 setTouchStartX(null);
 setTouchEndX(null);
 };

 const handleNext = useCallback(() => {
 if (isMobile) setCurrentSlide((prev) => (prev + 1) % projectData.length);
 }, [isMobile, projectData.length]);

 const handlePrev = useCallback(() => {
 if (isMobile) setCurrentSlide((prev) => (prev - 1 + projectData.length) % projectData.length);
 }, [isMobile, projectData.length]);

 const goToSlide = (index) => {
 if (isMobile) setCurrentSlide(index);
 };

 return (
 <section className="w-full bg-black py-10 px-4 md:px-16 overflow-hidden">
 <div className="max-w-[1400px] mx-auto">

 {/* Header */}
 <div className="max-w-[1400px] mx-auto mb-12 px-0 md:px-2 flex justify-between items-end">
 <h2 className="text-white text-3xl md:text-5xl font-light lowercase">projects</h2>
 <Link to="/projects">
 <button className="text-zinc-500 cursor-pointer hover:text-white transition-colors text-sm md:text-lg lowercase tracking-wider">view all</button>
 </Link>
 </div>

 {/* ================= DESKTOP GRID (Same as before) ================= */}
 <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10 md:px-6">
 {projectData.map(project => (
 <div key={project.id} className="group cursor-pointer">
 <div className="relative aspect-square overflow-hidden bg-[#0a0a0a] transition-all duration-1000">
 <img
 src={project.img}
 alt={project.title}
 loading="lazy"
 decoding="async"
 fetchpriority="low"
 width="600"
 height="600"
 className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8">
 <h1 className="text-white text-4xl font-light text-center mb-6">
 {project.title}
 </h1>
 <Button to={project.link} text="view more" size="sm" />
 </div>
 </div>
 {/* <h3 className="mt-4 text-white/60 group-hover:text-white transition lowercase">
 {project.title}
 </h3> */}
 </div>
 ))}
 </div>

 {/* ================= MOBILE SLIDER (Updated with Journal UI/Animation) ================= */}
 <div
 className="md:hidden relative"
 onTouchStart={handleTouchStart}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}
 >
 <div className="relative">
 <Link to={projectData[currentSlide].link} className="block relative aspect-[1/1] w-[90%] overflow-hidden bg-zinc-900 rounded-2xl m-auto">

 {/* Smooth Crossfade Image Transition */}
 <AnimatePresence>
 <motion.div
 key={currentSlide}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5, ease:"easeInOut" }}
 className="absolute inset-0 w-full h-full"
 >
 <img
 src={projectData[currentSlide].img}
 alt={projectData[currentSlide].title}
 className="w-full h-full object-cover transition-all duration-1000"
 loading="lazy"
 decoding="async"
 />
 </motion.div>
 </AnimatePresence>

 {/* Minimal Centered Text Overlay */}
 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 pb-6 px-6 pointer-events-none flex items-end justify-start z-10 rounded-b-2xl">
 <AnimatePresence mode="wait">
 <motion.div
 key={currentSlide}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -5 }}
 transition={{ duration: 0.3 }}
 className="text-center w-full"
 >
 <h3 className="text-white text-xl font-light lowercase line-clamp-2 leading-snug shadow-sm text-start">
 {projectData[currentSlide].title}
 </h3>
 </motion.div>
 </AnimatePresence>
 </div>
 </Link>
 </div>

 {/* Animated Track & Wheel Indicator */}
 <div className="flex justify-center mt-8 px-4">
 <div
 className="relative w-48 h-6 flex items-center cursor-pointer"
 onClick={(e) => {
 const rect = e.currentTarget.getBoundingClientRect();
 const clickX = e.clientX - rect.left;
 const percentage = clickX / rect.width;
 const clickedIndex = Math.round(percentage * (projectData.length - 1));
 goToSlide(Math.max(0, Math.min(clickedIndex, projectData.length - 1)));
 }}
 >
 <div className="w-full h-[2px] bg-white/20 rounded-full" />

 <motion.div
 animate={{
 left:`${(currentSlide / Math.max(1, projectData.length - 1)) * 100}%`,
 rotate: currentSlide * 360
 }}
 transition={{ type:"spring", stiffness: 500, damping: 30 }}
 className="absolute top-1/2 -translate-y-1/2 -ml-2.5 w-5 h-5 rounded-full border-[1.5px] border-white bg-black flex items-center justify-center overflow-hidden z-10"
 >
 <div className="absolute w-[1.5px] h-3 bg-white" />
 <div className="absolute w-3 h-[1.5px] bg-white" />
 </motion.div>
 </div>
 </div>

 {/* Navigation Arrows */}
 {/* <div className="flex justify-between items-center mt-2 px-4">
 <button 
 onClick={handlePrev}
 className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
 >
 <ChevronLeft size={20} strokeWidth={1.5} />
 </button>
 
 <button 
 onClick={handleNext}
 className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
 >
 <ChevronRight size={20} strokeWidth={1.5} />
 </button>
 </div> */}
 </div>

 </div>
 </section>
 );
};

export default ProjectsSection;