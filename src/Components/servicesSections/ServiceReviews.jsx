import React, { useState, useEffect } from"react";
import { motion } from"framer-motion";
import { MapPin } from"lucide-react";

// Yahan hum 'reviews' data ko as a prop receive kar rahe hain
const ServiceReviews = ({ reviews }) => {
 const [activeCard, setActiveCard] = useState(null);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
 const handleResize = () => setIsMobile(window.innerWidth < 768);
 handleResize();
 window.addEventListener("resize", handleResize);
 return () => window.removeEventListener("resize", handleResize);
 }, []);

 const handleToggle = (id) => {
 if (isMobile) {
 setActiveCard(activeCard === id ? null : id);
 }
 };

 // Agar us service mein koi review nahi hai, toh yeh section render nahi hoga
 if (!reviews || reviews.length === 0) return null;

 return (
 <section className="bg-black text-white py-5 md:py-10 px-4 md:px-8 font-lato">
 <div className="max-w-[1400px] mx-auto mb-16">
 <span className="text-7xl font-serif text-zinc-500 block -mb-8 leading-none">“</span>
 <h2 className="text-4xl md:text-5xl font-light tracking-tight lowercase">reviews</h2>
 <p className="text-xl md:text-2xl font-light text-zinc-400 mt-4 max-w-2xl leading-snug">
 see what our clients have to say about partnering with us on this service
 </p>
 </div>

 <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-4 relative">
 {reviews.map((review, index) => (
 <motion.div
 key={review.id}
 initial="initial"
 animate={isMobile && activeCard === review.id ?"hover" :"initial"}
 whileHover={!isMobile ?"hover" :""}
 onClick={() => handleToggle(review.id)}
 className="sticky md:relative h-[300px] bg-[#0c0c0c] overflow-hidden cursor-pointer border border-white/5 md:border-zinc-800 group"
 style={{ 
 top: isMobile ?`${80 + (index * 25)}px` :"auto", 
 marginBottom: isMobile ?"40px" :"0px",
 zIndex: index 
 }}
 >
 {/* 1. CONTENT LAYER */}
 <motion.div 
 variants={{
 initial: { filter:"blur(0px)", opacity: 1 },
 hover: { filter:"blur(2px)", opacity: 0.7 }
 }}
 transition={{ duration: 0.5 }}
 className="relative z-0 p-6 flex flex-col h-full bg-[#0c0c0c]"
 >
 <div className="flex gap-3 mb-4">
 
 {/* ---------- AVATAR LOGIC ---------- */}
 {review.avatar ? (
 <img 
 src={review.avatar} 
 loading="lazy" 
 alt={review.name} 
 className="w-12 h-12 rounded-full object-cover shrink-0" 
 />
 ) : (
 <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 text-xl font-light shrink-0">
 {review.name.charAt(0).toLowerCase()}
 </div>
 )}
 
 <p className="text-[16px] lowercase tracking-tighter text-zinc-400 leading-tight pt-3 text-center">
 {review.name}
 </p>
 </div>
 
 <p className="text-[12px] leading-relaxed font-light text-zinc-300 lowercase">
"{review.quote}"
 </p>
 
 <div className="mt-auto text-right">
 <p className="text-[11px] tracking-widest text-zinc-600 uppercase">-{review.name}</p>
 </div>
 </motion.div>

 {/* 2. IMAGE LAYER */}
 <motion.div
 variants={{
 initial: { height:"100px", y: 0 },
 hover: { height:"82%", y: 0 }
 }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] bg-black"
 >
 <img
 src={review.bgImg}
 alt=""
 className="w-full h-full object-cover transition-all duration-700"
 loading="lazy"
 decoding="async"
 />
 
 <motion.div 
 variants={{
 initial: { opacity: 0 },
 hover: { opacity: 1 }
 }}
 className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end"
 >
 {/* <h4 className="text-xl font-light lowercase text-white tracking-tight">
 {review.location}
 </h4>
 <div className="flex items-center gap-1.5 text-zinc-300 text-[10px] mt-1 uppercase tracking-widest">
 <MapPin size={10} className="text-zinc-400" />
 {review.city}
 </div> */}
 </motion.div>
 </motion.div>
 </motion.div>
 ))}
 </div>
 </section>
 );
};

export default ServiceReviews;