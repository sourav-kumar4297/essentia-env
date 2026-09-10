import React from"react";
import { motion } from"framer-motion";
import { BriefcaseBusiness } from"lucide-react";

const PageHeroSection = ({
 image,
 title,
 highlight =".",
 showCareerInfo = false,
 careerTitle ="careers",
 careerDescription ="",
 titleSize ="text-[55px] md:text-[65px]",
 category ="",
 clastyle ="",
}) => {
 return (
 <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black font-lato">

 {/* ✅ Optimized Background Image (same animation) */}
 <motion.img
 src={image}
 alt={title}
 className={`absolute inset-0 z-0 w-full h-full object-cover ${clastyle}`}
 loading="eager"
 fetchpriority="high"
 decoding="async"
 initial={{ scale: 1.1, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 1.5, ease:"easeOut" }}
 />

 {/* Overlay (unchanged) */}
 <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/40 to-transparent md:from-black/80" />

 {/* Content Container */}
 <div className="relative z-10 h-full w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col justify-end pb-12 md:pb-20 lg:flex-row lg:items-end lg:justify-between">

 {/* Left Title Area */}
 <div className="w-full lg:w-[65%]">
 <motion.h1
 initial={{ opacity: 0, x: -30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, delay: 0.5 }}
 className={`text-white font-light leading-[0.85] tracking-tighter lowercase break-words ${titleSize}`}
 >
 {title}
 {/* <span className="text-zinc-100">{highlight}</span> */}
 </motion.h1>

 <motion.p
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 0.6, y: 0 }}
 transition={{ delay: 1.2 }}
 className="mt-3 md:mt-5 ml-1 tracking-[0.3em] lowercase text-sm md:text-lg text-white"
 >
 {category}
 </motion.p>
 </div>

 {/* Right Side - Career Info */}
 {showCareerInfo && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.8 }}
 className="w-full sm:max-w-[350px] mt-8 lg:mt-0 lg:mb-4"
 >
 <div className="flex items-center gap-3 mb-3">
 <div className="p-2 border border-white/20 rounded-sm shrink-0">
 <BriefcaseBusiness size={18} className="text-white opacity-80" />
 </div>
 <h2 className="text-white text-lg md:text-xl font-light tracking-widest lowercase">
 {careerTitle}
 </h2>
 </div>

 <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
 {careerDescription}
 </p>
 </motion.div>
 )}
 </div>

 {/* Decorative Border */}
 <div className="absolute inset-0 pointer-events-none" />
 </section>
 );
};

export default PageHeroSection;
